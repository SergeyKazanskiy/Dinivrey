from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import and_, extract
from backend.app.models.events import Student
from database import SessionLocal
from typing import List
from schemas import StudentResponse


router = APIRouter()

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.get("/filter_by_month/", response_model=List[StudentResponse])
async def get_students_by_month(year: int, month: int, db: AsyncSession = Depends(get_db)):
    
    query = select(Student).where(
        and_(
            extract("year", Student.created_at) == year,
            extract("month", Student.created_at) == month
        )
    )
    result = await db.execute(query)
    students = result.scalars().all()
    return students



