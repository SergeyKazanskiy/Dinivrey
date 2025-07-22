from fastapi import APIRouter, Depends, HTTPException
import json
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import asc
from database import get_session
from crud import CRUD
from roles.admin import schemas 
import models
from .read import get_coache_groups

router = APIRouter()


# Students
@router.post("/camps", description='Create new camp in city', response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_camp(data: schemas.CampCreate, session: AsyncSession = Depends(get_session)):
    # camps: List[schemas.CampResponse] = await read.get_camps(session)
    # for camp in camps:
    #     if camp.city == data.city and camp.name == data.name:
    #          raise HTTPException(status_code=500, detail="There is already a camp with such name in this city")
        
    # try:
    #     camp_path = utils.create_folder("images/photos", f"{data.city}_{data.name}")
    #     utils.create_folder(camp_path, "groups")
    #     utils.create_folder(camp_path, "coaches")
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Failed to create folders: {e}")

    return {"id": await CRUD.add(models.Camp, data, session)}

@router.post("/camps/groups", response_model=schemas.ResponseId, tags=["Admin_create"]) #camp_id ???
async def create_group(data: schemas.GroupCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Group, data, session)}

@router.post("/camps/groups/students", response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_student(data: schemas.StudentCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Student, data, session)}

@router.post("/camps/groups/schedule", response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_schedule(data: schemas.GroupScheduleCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.GroupSchedule, data, session)}

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

@router.post("/students/achievements", tags=["Admin_create"])
async def add_student_achieve(data: schemas.AchievementCreate, session: AsyncSession = Depends(get_session)):
    id = await CRUD.add(models.Achievement, data, session)
    achieve = await CRUD.read(models.Achieve, data.achieve_id, session)
    return {
        "id": id,
        "image": achieve.image,
        "name": achieve.name,
        "desc": achieve.desc,
        "in_profile": data.in_profile,
        "category": achieve.category,
        "level": data.level,
        "trigger": achieve.trigger,
        "effect": achieve.effect
    }


# Coaches
@router.post("/camps/coaches", response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_coach(data: schemas.CoachCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Coach, data, session)} 

@router.post("/camps/coaches/groups", response_model=schemas.ResponseId, tags=["Admin_create"])
async def add_coach_group(data: schemas.CoachGroupCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.CoachGroup, data, session)} 

@router.post("/students/games", response_model=schemas.ResponseId, tags=["Manager"])
async def coach_group_add(data: schemas.GameCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Game, data, session)} 

# Drills
@router.post("/drills", response_model=schemas.ResponseId, tags=["Admin_create"])
async def create_drill(data: schemas.DrillCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Drill, data, session)} 

# Settings
@router.post("/settings/metrics/initial", response_model=schemas.ResponseOk, tags=["Admin_create"])
async def add_metric(data: schemas.MetricCreate, session: AsyncSession = Depends(get_session)):
   
    for i in range(10, 0, -1):
        metric = schemas.MetricBase(
            camp_id = data.camp_id,
            test= data.test,
            start = 0,
            stop = 0,
            score = i
        )
        await CRUD.add(models.Metric, metric, session)
    return {"isOk": True}