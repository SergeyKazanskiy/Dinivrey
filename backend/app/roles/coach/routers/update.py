from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models

router = APIRouter()


@router.put("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Coach"]) #???
async def update_group(id: int, data: schemas.GroupUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Group, id, data, session)}

@router.put("/camp/events/{id}", response_model=schemas.ResponseOk, tags=["Coach"]) #???
async def update_event(id: int, data: schemas.EventUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Event, id, data, session)}

@router.put("/camp/coaches/{id}", response_model=schemas.ResponseOk, tags=["Coach"]) #???
async def update_coach(id: int, data: schemas.CoachUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Coach, id, data, session)}

# Attendances
@router.put("/camps/events/attendances/{id}", response_model=schemas.ResponseOk, tags=["Coach"])
async def update_event(id: int, data: schemas.AttendanceUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Attendance, id, data, session)}

@router.put("/camps/events/{event_id}/groups/{group_id}/attendances", response_model=schemas.ResponseOk, tags=["Coach"])
async def update_all_attendances(event_id: int, group_id: int, data: schemas.AttendanceUpdate, session: AsyncSession = Depends(get_session)):
    rows = await CRUD.get(models.Attendance, session, filters={"event_id": event_id, "group_id": group_id})
    for row in rows:
        await CRUD.update(models.Attendance, row.id, data, session)
    return {"isOk": True}