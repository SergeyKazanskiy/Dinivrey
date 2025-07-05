from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
from database import get_session
from crud import CRUD
from roles.manager import schemas
import models

router = APIRouter()


# Groups
@router.put("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def update_group(id: int, data: schemas.GroupUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Group, id, data, session)}

@router.put("/camps/groups/schedule/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def update_group_shedule(id: int, data: schemas.GroupScheduleUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.GroupSchedule, id, data, session)}

# Coaches
@router.put("/camps/coaches/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def update_coach(id: int, data: schemas.CoachUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Coach, id, data, session)}

@router.put("/camps/groups/{id}/new_coach", response_model=schemas.ResponseOk, tags=["Manager"])
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

# Events
@router.put("/camps/events/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def update_event(id: int, data: schemas.EventUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Event, id, data, session)}

  

# @router.put("/camps/groups/students/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_student(id: int, data: schemas.StudentUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Student, id, data, session)}

# @router.put("student/{id}/parents", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_student_address(id: int, data: schemas.ParentCreate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Parent, id, data, session)}

# @router.put("camp/events/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_event(id: int, data: schemas.EventUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Event, id, data, session)}



# @router.put("achieves/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_achieve(id: int, data: schemas.AchieveUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Achieve, id, data, session)}
