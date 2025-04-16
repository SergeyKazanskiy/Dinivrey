from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD
from roles.admin import schemas 
import models

router = APIRouter()


@router.post("/camps/groups", response_model=schemas.ResponseId, tags=["Manager"]) #camp_id ???
async def create_group(data: schemas.GroupCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Group, data, session)}

@router.post("/events", response_model=schemas.ResponseId, tags=["Manager"])
async def create_event(data: schemas.EventCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Event, data, session)}

@router.post("/achieves", response_model=schemas.ResponseId, tags=["Manager"])
async def create_achieve(data: schemas.AchieveCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Achieve, data, session)} 

@router.post("/coaches", response_model=schemas.ResponseId, tags=["Manager"])
async def create_coach(data: schemas.CoachCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Coach, data, session)} 