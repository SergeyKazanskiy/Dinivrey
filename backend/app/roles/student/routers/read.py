from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models

router = APIRouter()


@router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentShort], tags=["Student"])
async def get_students(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Student"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)


@router.get("/student/{id}/events", response_model=List[schemas.EventResponse], tags=["Student"])
async def get_student_statistics(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Event, session)