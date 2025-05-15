from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import asc
from database import get_session
from crud import CRUD
from roles.admin import schemas 
import models
from datetime import datetime

router = APIRouter()


@router.post("/camps/groups/game", response_model=schemas.ResponseId, tags=["Coach"]) #camp_id ???
async def create_game(data: schemas.GroupCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Group, data, session)}

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
            present=False
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
