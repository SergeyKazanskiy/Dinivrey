from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models

router = APIRouter()


@router.get("/camps/{id}/groups", response_model=List[schemas.GroupResponse], tags=["Coach"])
async def get_camp_groups(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Group, session, filters={models.Group.camp_id: id}, order_by=models.Group.name)

@router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentShort], tags=["Coach"])
async def get_students(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={models.Group.camp_id: id}, order_by=models.Group.name)

@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Coach"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/student/{id}/parents", response_model=List[schemas.ParentResponse], tags=["Coach"])
async def get_student_parents(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Parent, session, filters={models.Parent.student_id: id})

@router.get("/student/{id}/achievements", response_model=List[schemas.AchievementResponse], tags=["Coach"])
async def get_student_achievements(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achievement, session, filters={models.Achievement.student_id: id})
