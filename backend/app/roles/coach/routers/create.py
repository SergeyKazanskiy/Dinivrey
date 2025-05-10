from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import asc
from database import get_session
from crud import CRUD
from roles.admin import schemas 
import models

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

