from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete
from database import get_session
from crud import CRUD    
from roles.admin import schemas
import models
from sqlalchemy.future import select

router = APIRouter()


# @router.delete("/student/achievements/{id}", response_model=schemas.ResponseOk, tags=["Coach"])#???
# async def remove_achievement(id: int, session: Session = Depends(get_session)):
#     return {"isOk": await CRUD.delete(models.Achievement, id, session)}


# Attendance
@router.delete("/camps/events/{event_id}/groups/{group_id}", response_model=schemas.ResponseOk, tags=["Coach"])
async def delete_attendance(event_id: int, group_id: int, session: AsyncSession = Depends(get_session)):
    event = await CRUD.read(models.Event, event_id, session)
   
    if event.type == 'Exam':
        result = await session.execute(
            select(models.Attendance)
            .where(
                models.Attendance.event_id == event_id,
                models.Attendance.group_id == group_id
                )
            )
        attendances = result.scalars().all()
        
        for attendance in attendances:
            if attendance.present:
                await session.execute(
                    delete(models.Test)
                    .where(
                        models.Test.student_id == attendance.student_id,
                        models.Test.timestamp == event.timestamp
                    )
            )
    stmt = (
        delete(models.Attendance)
        .where(
            models.Attendance.event_id == event_id,
            models.Attendance.group_id == group_id
        )
    )
    await session.execute(stmt)
    await session.commit()
    return {"isOk": True}

# Test
@router.delete("/students/tests/{id}", response_model=schemas.ResponseOk, tags=["Coach"])
async def delete_student_test(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Test, id, session)}

# Achievement
@router.delete("/students/achievements/{id}", response_model=schemas.ResponseOk, tags=["Coach"])
async def remove_student_achievement(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Achievement, id, session)}

# Drill
@router.delete("/camps/events/drills/{id}", response_model=schemas.ResponseOk, tags=["Coach"])
async def detach_event_drill(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.EventDrill, id, session)}

# Game
@router.delete("/camps/events/games/{id}", response_model=schemas.ResponseOk, tags=["Coach"])
async def delete_event_game(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Game, id, session)}