from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD
from roles.student import schemas
import models

router = APIRouter()


# Achieves
@router.put("/students/achievements/{id}", response_model=schemas.ResponseOk, tags=["Student"])
async def update_achieve(id: int, data: schemas.AchieveUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Achievement, id, data, session)}

# Notifications
@router.put("/students/{id}/notification_token", response_model=schemas.ResponseOk, tags=["Student"])
async def update_notification_token(id: int, data: schemas.TokenUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Student, id, data, session)}


