from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD
from roles.admin import schemas 
import models

router = APIRouter()


@router.post("/camps/groups/game", response_model=schemas.ResponseId, tags=["Coach"]) #camp_id ???
async def create_game(data: schemas.GroupCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Group, data, session)}

