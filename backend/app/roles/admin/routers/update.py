from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models
from sqlalchemy.future import select
from sqlalchemy import delete
# import utils
# import read

router = APIRouter()


# Groups
@router.put("/camps/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_camp(id: int, data: schemas.CampUpdate, session: AsyncSession = Depends(get_session)):
    # camp: schemas.CampResponse = await read.get_camp(id, session)

    # city = data.city or camp.city
    # name = data.name or camp.name

    # try:
    #     utils.rename_folder("images/photos", f"{camp.city}_{camp.name}", f"{city}_{name}")
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Failed to rename folder: {e}")

    return {"isOk": await CRUD.update(models.Camp, id, data, session)}


@router.put("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_group(id: int, data: schemas.GroupUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Group, id, data, session)}

@router.put("/camps/groups/schedule/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_group_shedule(id: int, data: schemas.GroupScheduleUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.GroupSchedule, id, data, session)}

# Student
@router.put("/students/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_student(id: int, data: schemas.StudentUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Student, id, data, session)}

@router.put("/students/parents/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_student_parents(id: int, data: List[schemas.ParentUpdate], session: AsyncSession = Depends(get_session)):
    for parent in data:
        await CRUD.update(models.Parent, parent.id, parent, session)   
    return {"isOk": True}

@router.put("/students/tests/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_student_test(id: int, data: schemas.TestUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Test, id, data, session)}

@router.put("/students/games/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_student_game(id: int, data: schemas.GameUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Game, id, data, session)}

@router.put("/students/achievements/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_achieve(id: int, data: schemas.AchievementUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Achievement, id, data, session)}

# Events
@router.put("/camps/events/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_event(id: int, data: schemas.EventUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Event, id, data, session)}

@router.put("/camps/events/attendances/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_attendance(id: int, data: schemas.AttendanceUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Attendance, id, data, session)}

@router.put("/camps/events/{event_id}/groups/{group_id}/attendances", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_all_attendances(event_id: int, group_id: int, data: schemas.AttendanceUpdate, session: AsyncSession = Depends(get_session)):
    rows = await CRUD.get(models.Attendance, session, filters={"event_id": event_id, "group_id": group_id})
    for row in rows:
        await CRUD.update(models.Attendance, row.id, data, session)
    return {"isOk": True}


# Achieves
@router.put("/achieves/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_achieve(id: int, data: schemas.AchieveUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Achieve, id, data, session)}

@router.put("/achieves/rules/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_achieve_rules(id: int, data: List[schemas.RuleCreate], session: AsyncSession = Depends(get_session)): 
    await session.execute(delete(models.Rule).where(models.Rule.achieve_id == id))
    await session.commit()
    
    for rule in data:
        await CRUD.add(models.Rule, rule, session)   
    return {"isOk": True}

# Coaches
@router.put("/camps/coaches/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_coach(id: int, data: schemas.CoachUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Coach, id, data, session)}


# Drills
@router.put("/drills/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_drill(id: int, data: schemas.DrillUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Drill, id, data, session)}

@router.put("/settings/metrics/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_metric(id: int, data: schemas.MetricUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Metric, id, data, session)}