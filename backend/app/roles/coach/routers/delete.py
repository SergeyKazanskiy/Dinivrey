from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models

router = APIRouter()


@router.delete("/student/achievements/{id}", response_model=schemas.ResponseOk, tags=["Coach"])
async def remove_achievement(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Achievement, id, session)}
