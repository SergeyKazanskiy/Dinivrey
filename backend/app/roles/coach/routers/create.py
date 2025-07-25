from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import asc, func, insert
from database import get_session
from crud import CRUD
from roles.coach import schemas 
import models
from datetime import datetime
from ..utils import report_service, email_service, test_report_data
from jinja2 import Environment, FileSystemLoader
from typing import List
from fastapi.responses import JSONResponse
from pathlib import Path

router = APIRouter()


# Game
@router.post("/camps/events/games", response_model=schemas.ResponseId, tags=["Coach"])
async def add_event_game(data: schemas.GameCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Game, data, session)}

@router.post("/camps/events/games/gamers", response_model=schemas.ResponseOk, tags=["Coach"])
async def add_event_game_gamers(data: List[schemas.GamerCreate], session: AsyncSession = Depends(get_session)):

    stmt = insert(models.Gamer).values([item.model_dump() for item in data])
    await session.execute(stmt)
    await session.commit()

    return {"isOk": True}

# Attendances
@router.post("/camps/events/attendances", response_model=schemas.ResponseOk, tags=["Coach"])
async def add_attendances(data: schemas.AttendanceDataCreate, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.Student.id)
        .where(models.Student.group_id == data.group_id)
        .order_by(asc(models.Student.first_name))
    )
    studentIds = await session.execute(stmt)
   
    for studentId in studentIds.scalars().all():
        attendance = schemas.AttendanceCreate(
            event_id=data.event_id,
            group_id=data.group_id,
            student_id=studentId,
            present=False,
            comment=''
        )
        await CRUD.add(models.Attendance, attendance, session)
    return {"isOk": True}


# Tests
@router.post("/students/tests", response_model=schemas.ResponseId, tags=["Coach"])
async def add_student_test(data: schemas.TestCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Test, data, session)}
 
@router.post("/camps/events/{event_id}/groups/{group_id}/tests", response_model=schemas.ResponseOk, tags=["Coach"])
async def add_all_present_students_new_tests(event_id: int, group_id: int, session: AsyncSession = Depends(get_session)):
    A = models.Attendance
    E = models.Event
    stmt = (
        select(A.student_id, E.timestamp)
        .join(E, A.event_id == E.id)
        .where((A.event_id == event_id) & (A.group_id == group_id) & (A.present == True)) 
    )
    result = await session.execute(stmt)
    rows = result.all()
    
    for row in rows:
        date=datetime.fromtimestamp(row[1] / 1000).strftime("%a %d")
        test = schemas.TestCreate(
            student_id=row[0],
            timestamp=row[1],
            date=date,
            speed=0.0,
            stamina=0.0,
            climbing=0.0,
            evasion=0.0,
            hiding=0.0
        )
        id = await CRUD.add(models.Test, test, session) # & != timestamp !!!

    return {"isOk": True}

# Achievements
@router.post("/students/achievements", tags=["Coach"])
async def add_student_achieve(data: schemas.AchievementCreate, session: AsyncSession = Depends(get_session)):
    id = await CRUD.add(models.Achievement, data, session)
    achieve = await CRUD.read(models.Achieve, data.achieve_id, session)
    return {
        "id": id,
        "achieve_id": data.achieve_id,
        "image": achieve.image,
        "name": achieve.name,
        "in_profile": data.in_profile,
        "category": achieve.category,
        "level": data.level,
        "effect": achieve.effect
    }

# Events
@router.post("/camps/events", response_model=schemas.ResponseId, tags=["Coach"])
async def create_event(data: schemas.EventCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Event, data, session)}

@router.post("/camps/events/drills", response_model=schemas.ResponseId, tags=["Coach"]) #camp_id ???
async def attach_event_drill(data: schemas.EventDrillCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.EventDrill, data, session)}


# Email
@router.post("/coaches/events/attendance/send-report", tags=["Coach"])
async def send_attendance_report(data: schemas.AttendanceDataForReport, session: AsyncSession = Depends(get_session)):
    coach: schemas.CoachResponse = await CRUD.read(models.Coach, data.coach_id, session)
    signature = f"data:image/png;base64,{coach.signature}"
    
    report = schemas.AttendanceReport(
        date=data.date,
        place=data.camp_name,
        group=data.group_name,
        time=data.time,
        total_members= await getParticipantsAmount(data.event_id, data.group_id, session),
        present_members= await getParticipantsPresent(data.event_id, data.group_id, session),
        coach_name=coach.first_name + ' ' +  coach.last_name,
        signature= signature,
        students= await get_attendances(data.event_id, data.group_id, session)
    )
    # report = test_report_data.get_test_attendance_data()
    env = Environment(loader=FileSystemLoader("roles/coach/templates"))
    template = env.get_template("attendance_report.html")
    html_content = template.render(**report.model_dump(exclude_unset=True))

    output_path = Path("roles/coach/templates/test_attendance_report.html")
    with output_path.open("w", encoding="utf-8") as f:
        f.write(html_content)

    field_name = f"group{data.group_number}_report" 
    fields = schemas.EventUpdate(**{field_name: True})
    await CRUD.update(models.Event, data.event_id, fields, session)

    try:
        await email_service.send_html_email('artura12334@gmail.com', html_content)
        return {"isOk": True}
    except Exception as e:
        return JSONResponse(status_code=500, content={"isOk": False, "error": str(e)})

async def get_attendances(event_id:int, group_id: int, session: AsyncSession) -> List[schemas.StudentReport]:
    A = models.Attendance
    S = models.Student
    stmt = (
        select(S.first_name, S.last_name, A.present)
            .join(S, A.student_id == S.id)
            .where(A.group_id == group_id, A.event_id == event_id)
            .order_by(asc(S.first_name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"name": row[0] + ' ' + row[1], "present": row[2]} for row in rows]

async def getParticipantsAmount(event_id: int, group_id: int, session: AsyncSession) -> int:
    attendance = models.Attendance

    stmt = (
        select(func.count())
        .where(attendance.event_id == event_id, attendance.group_id == group_id)
    )
    result = await session.execute(stmt)
    return  result.scalar_one()

async def getParticipantsPresent(event_id: int, group_id: int, session: AsyncSession) -> int:
    attendance = models.Attendance

    stmt = (
        select(func.count())
        .where(attendance.event_id == event_id, attendance.group_id == group_id, attendance.present == True)
    )
    result = await session.execute(stmt)
    return  result.scalar_one()
