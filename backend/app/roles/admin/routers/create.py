from fastapi import APIRouter, Depends
import json
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import asc
from database import get_session
from crud import CRUD
from roles.admin import schemas 
import models

router = APIRouter()


# Students
@router.post("/camps", description='Create new camp in new city', response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_camp(data: schemas.CampCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Camp, data, session)}

@router.post("/camps/groups", response_model=schemas.ResponseId, tags=["Admin_create"]) #camp_id ???
async def create_group(data: schemas.GroupCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Group, data, session)}

@router.post("/camps/groups/students", response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_student(data: schemas.StudentCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Student, data, session)}

# Events
@router.post("/camps/events", response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_event(data: schemas.EventCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Event, data, session)}

@router.post("/camps/events/attendances", response_model=schemas.ResponseOk, tags=["Admin_create"])
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

# Achieves
@router.post("/achieves", response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_achieve(data: schemas.AchieveCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Achieve, data, session)} 

@router.post("/achieves/rules", response_model=schemas.ResponseOk, tags=["Admin_create"])
async def add_achieve_rules(data: List[schemas.RuleCreate], session: AsyncSession = Depends(get_session)):
    for rule in data:
        await CRUD.add(models.Rule, rule, session)
    return {"isOk": True} 

# Student
@router.post("/students/parents", tags=["Admin_create"])
async def add_student_parents(data: List[schemas.ParentCreate], session: AsyncSession = Depends(get_session)):
    ids = []
    for parent in data:
        id = await CRUD.add(models.Parent, parent, session)
        ids.append(id)
    return ids 

@router.post("/students/tests", response_model=schemas.ResponseId, tags=["Admin_create"])
async def add_student_test(data: schemas.TestCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Test, data, session)}

@router.post("/students/games", response_model=schemas.ResponseId, tags=["Admin_create"])
async def add_student_game(data: schemas.GameCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Game, data, session)}

@router.post("/students/achievements", response_model=schemas.ResponseId, tags=["Admin_create"])
async def add_student_achievement(data: schemas.AchievementCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Achievement, data, session)}


# Coaches
@router.post("/coaches", response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_coach(data: schemas.CoachCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Coach, data, session)} 