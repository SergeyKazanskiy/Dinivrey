from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD    
from roles.admin import schemas
import models
from services.NotificationService import NotificationService

router = APIRouter()


# Notifications
@router.delete("/students/{id}/notifications", response_model=schemas.ResponseOk, tags=["Student"])
async def delete_student_notifications(id: int, session: AsyncSession = Depends(get_session)):
    return {"isOk": await NotificationService.delete_notifications(id, session)}