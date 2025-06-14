from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import get_session
from crud import CRUD
from roles.manager import schemas
import models

router = APIRouter()


@router.get("/coaches", response_model=List[schemas.CoachShortResponse], tags=["Admin_select"])
async def get_coaches(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Coach, session)

# @router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentShort], tags=["Manager"])
# async def get_students(id: int, session: AsyncSession = Depends(get_session)):
#     return await CRUD.read(models.Student, id, session)

# @router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Manager"])
# async def get_student(id: int, session: AsyncSession = Depends(get_session)):
#     return await CRUD.read(models.Student, id, session)