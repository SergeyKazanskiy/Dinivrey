from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models
from sqlalchemy.future import select
from sqlalchemy import delete
from services.photo_storage import PhotoStorageService


router = APIRouter()


# Groups
@router.put("/camps/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_camp(id: int, data: schemas.CampUpdate, session: AsyncSession = Depends(get_session)):
    
    result = await PhotoStorageService.rename_camp_folder(id, data.name, session)
    if not result.isOk:
        raise HTTPException(status_code=result.error_code, detail=result.error_message)

    return {"isOk": await CRUD.update(models.Camp, id, data, session)}


@router.put("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_group(id: int, data: schemas.GroupUpdate, session: AsyncSession = Depends(get_session)):

    result = await PhotoStorageService.rename_group_folder(id, data.name, session)
    if not result.isOk:
        raise HTTPException(status_code=result.error_code, detail=result.error_message)

    return {"isOk": await CRUD.update(models.Group, id, data, session)}

@router.put("/camps/groups/schedule/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def update_group_shedule(id: int, data: schemas.GroupScheduleUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.GroupSchedule, id, data, session)}

@router.put("/camps/groups/schedule/{id}/coach", tags=["Admin_update"])
async def update_group_shedule(id: int, data: schemas.GroupScheduleUpdate, session: AsyncSession = Depends(get_session)):
    await CRUD.update(models.GroupSchedule, id, data, session)
    coach = await CRUD.read(models.Coach, data.coach_id, session)
    return {"name": coach.first_name + ' ' + coach.last_name}

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

@router.post("/students/{id}/photo", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_coach_photo(id: int, file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    return await PhotoStorageService.upload_student_photo(id, file, session)

# @router.put("/students/games/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
# async def update_student_game(id: int, data: schemas.GameUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Game, id, data, session)}

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

@router.post("/camps/coaches/{id}/photo", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_coach_photo(id: int, file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    return await PhotoStorageService.upload_coach_photo(id, file, session)


# Drills
@router.put("/drills/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_drill(id: int, data: schemas.DrillUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Drill, id, data, session)}

@router.put("/settings/metrics/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_metric(id: int, data: schemas.MetricUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Metric, id, data, session)}


# Schedule
@router.put("/camps/groups/{id}/new_coach", response_model=schemas.ResponseOk, tags=["Manager"]) #???
async def change_group_coach(id: int, data: schemas.GroupCoachUpdate, session: AsyncSession = Depends(get_session)):
    
    query = select(models.CoachGroup).where(models.CoachGroup.group_id == id)
    result = await session.execute(query)
    entry = result.scalars().first()
    if entry:
        setattr(entry, 'coache_id', data.coach_id)
        await session.commit()
    else:
        new_record = schemas.CoachGroupAdd(coache_id=data.coach_id, group_id=id)
        await CRUD.add(models.CoachGroup, new_record, session)
    
    query = select(models.GroupSchedule).where(models.GroupSchedule.group_id == id)
    result = await session.execute(query)
    schedules = result.scalars().all()

    for item in schedules:
        item.coach_id = data.coach_id

    await session.commit()
    return {"isOk": True}