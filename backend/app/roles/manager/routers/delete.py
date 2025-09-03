from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_session
from crud import CRUD
from roles.manager import schemas
import models
from sqlalchemy import delete, update
from sqlalchemy.engine import CursorResult
from services.photo_storage import PhotoStorageService

router = APIRouter()


# Groups
@router.delete("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_group(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Group, id, session)}

@router.delete("/camps/groups/schedule/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_student(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.GroupSchedule, id, session)}

@router.delete("/camps/groups/students/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_student(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Student, id, session)}

@router.delete("/student/achievements/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def remove_achievement(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Achievement, id, session)}

@router.delete("/achieves/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_achieve(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Achieve, id, session)}


# Coaches
@router.delete("/camps/coaches/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_coach(id: int, session: Session = Depends(get_session)):

    await session.execute(
        update(models.GroupSchedule)
        .where(models.GroupSchedule.coach_id == id)
        .values(coach_id=0)
    )

    result: CursorResult = await session.execute(
        delete(models.Coach).where(models.Coach.id == id)
    )

    await session.commit()

    res = await PhotoStorageService.delete_coach_photo(id, session)
    if not res.isOk:
        raise HTTPException(status_code=res.error_code, detail=res.error_message)
    
    return {"isOk": result.rowcount > 0}


@router.delete("/camps/coaches/groups/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def remove_coach_group(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.CoachGroup, id, session)}


# Events
@router.delete("/camps/events/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_event(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Event, id, session)}