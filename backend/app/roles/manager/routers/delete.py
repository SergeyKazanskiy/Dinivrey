from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_session
from crud import CRUD
from roles.manager import schemas
import models

router = APIRouter()


@router.delete("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_group(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Group, id, session)}

@router.delete("/camps/groups/students/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_student(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Student, id, session)}

@router.delete("/student/achievements/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def remove_achievement(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Achievement, id, session)}

@router.delete("/achieves/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_achieve(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Achieve, id, session)}

@router.delete("camp/events/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_event(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Event, id, session)}

@router.delete("camp/coaches/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def delete_coach(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Coach, id, session)}

@router.delete("camp/coach/groups/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def remove_coach_group(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.CoachGroup, id, session)}