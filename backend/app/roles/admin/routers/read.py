from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models
from sqlalchemy.future import select
from sqlalchemy import desc, asc
from datetime import datetime

router = APIRouter()

# Students
@router.get("/camps", response_model=List[schemas.CampResponse], tags=["Admin_select"])
async def get_camps(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Camp, session)

@router.get("/camps/{id}", response_model=schemas.CampResponse, tags=["Admin_select"])
async def get_camp(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Camp, id, session)

@router.get("/camps/{id}/groups", response_model=List[schemas.GroupResponse], tags=["Admin_select"])
async def get_camp_groups(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Group, session, filters={"camp_id": id}, order_by="name")

@router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentShort], tags=["Admin_select"])
async def get_students(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": id}, order_by="first_name")

@router.get("/camps/groups/students/all", response_model=List[schemas.StudentShort], tags=["Admin_select"])
async def get_all_students(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, order_by="first_name")

# Events
@router.get("/camps/events/all", response_model=List[schemas.EventResponse], tags=["Admin_select"])
async def get_all_events(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Event, session)

@router.get("/camps/{camp_id}/events/latest", tags=["Admin_select"])
async def get_latest_event(camp_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.Event).where(models.Event.camp_id == camp_id).order_by(desc(models.Event.timestamp)).limit(1))
    event = result.scalar_one_or_none()  # Вызываем ОДИН раз
    isEvents = True if event else False
    timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)
    return {"year": date.year, "month": date.month, "isEvents": isEvents}

@router.get("/camps/{camp_id}/events", tags=["Admin_select"])
async def get_events(year: int, month: int, camp_id: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Event)
        .where(models.Event.timestamp.between(start_ts, end_ts), models.Event.camp_id == camp_id)
        .order_by(asc(models.Event.timestamp))
    )
    return result.scalars().all()

@router.get("/camps/events/attendances", tags=["Admin_select"]) #
async def get_all_attendances(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Attendance, session)

@router.get("/camps/events/{event_id}/groups/{group_id}/attendances", tags=["Admin_select"])
async def get_attendances(event_id:int, group_id: int, session: AsyncSession = Depends(get_session)):
    A = models.Attendance
    S = models.Student
    stmt = (
        select(A.id, A.student_id, S.first_name, S.last_name, A.present)
        .join(S, A.student_id == S.id)
        .where((A.group_id == group_id) & (A.event_id == event_id))
        .order_by(asc(S.first_name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"id": row[0],
             "student_id": row[1],
             "first_name": row[2],
             "last_name": row[3],
             "present": row[4]} for row in rows]


@router.get("/camps/groups/{group_id}/students/names", response_model=List[schemas.StudentName], tags=["Admin_select"]) #
async def get_student_names(group_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": group_id}, order_by="first_name")

# Coaches
@router.get("/camps/{id}/coaches", response_model=List[schemas.CoachResponse], tags=["Admin_select"])
async def get_camp_coaches(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Coach, session, filters={models.Coach.camp_id: id}, order_by=models.Coach.first_name)

@router.get("/camps/coache/{id}/groups", response_model=List[schemas.CoachGroupResponse], tags=["Admin_select"])#severel groups
async def get_camp_coaches(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.CoachGroup, id, session)

# Achieves
@router.get("/achieves/all", response_model=List[schemas.AchieveResponse], tags=["Admin_select"])
async def get_achieves(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session)

@router.get("/achieves", response_model=List[schemas.AchieveResponse], tags=["Admin_select"])
async def get_achieves(category: str, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session, filters={"category": category})

@router.get("/achieves/{id}", response_model=schemas.AchieveResponse, tags=["Admin_select"])
async def get_achieve(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Achieve, id, session)

@router.get("/achieves/{id}/rules", response_model=List[schemas.AchieveResponse], tags=["Admin_select"])
async def get_achieve_rules(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session)

# Student
@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Admin_select"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/students/{id}/parents", response_model=List[schemas.ParentResponse], tags=["Admin_select"])
async def get_student_parents(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Parent, session, filters={'student_id': id})

@router.get("/students/{id}/tests", response_model=List[schemas.TestResponse], tags=["Admin_select"])
async def get_student_tests(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Test).where(models.Test.timestamp.between(start_ts, end_ts), models.Test.student_id == id)
    )
    return result.scalars().all()

@router.get("/students/{id}/games", response_model=List[schemas.GameResponse], tags=["Admin_select"])#??? year, month
async def get_student_games(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Game).where(models.Game.timestamp.between(start_ts, end_ts), models.Game.student_id == id)
    )
    return result.scalars().all()

@router.get("/students/{id}/attendance", tags=["Admin_select"])
async def get_student_attendance(id: int, session: AsyncSession = Depends(get_session)):
    return {}

@router.get("/students/{id}/achievements", tags=["Admin_select"])
async def get_student_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(S.id, A.category, A.name, A.image, S.level, S.in_profile, A.effect, A.trigger, A.desc)
        .join(A, S.achieve_id == A.id )
        .where( S.student_id == id )
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"id": row[0],
             "category": row[1],
             "name": row[2],
             "image": row[3],
             "level": row[4],
             "in_profile": row[5],
             "effect": row[6],
             "trigger": row[7],
             "desc": row[8]} for row in rows]

@router.get("/camps/groups/{id}/liders", tags=["Admin_select"])
async def get_liders(id: int, session: AsyncSession = Depends(get_session)):
    students = await CRUD.get(models.Student, session, filters={"group_id": id}, order_by="first_name")
    liders = []
    for student in students:
        tests = await session.execute(select(models.Test).where(models.Test.student_id == student.id).order_by(desc(models.Test.timestamp)).limit(1))
        test = tests.scalar_one_or_none()
        if test:
            lider = {
                'id': student.id,
                'photo': student.photo,
                'first_name': student.first_name,
                'last_name': student.last_name,
                'gender': student.gender,
                'age': student.age,
                'phone': student.phone or '',
                'speed': test.speed,
                'stamina': test.stamina,
                'climbing': test.climbing,
                'evasion': test.evasion,
                'hiding': test.hiding,  
                'achieves': await getAchievements(id, session)
            }
            liders.append(lider)
    return liders

async def getAchievements(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(A.name, A.image, S.level)
        .join(A, S.achieve_id == A.id )
        .where(
            S.student_id == id,
            S.in_profile == True
        )
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"name": row[0], "image": row[1], "level": row[2]} for row in rows]
