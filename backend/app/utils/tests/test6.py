from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import and_, extract
from backend.app.models.events import Student
from database import AsyncSessionLocal
from typing import List
from schemas import StudentResponseFormatted
from datetime import datetime

router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/filter_by_month/", response_model=List[StudentResponseFormatted])
async def get_students_by_month(year: int, month: int, db: AsyncSession = Depends(get_db)):
    """ Получить студентов, созданных в указанном месяце и году с форматированием даты и времени """
    
    if not (1 <= month <= 12):
        raise HTTPException(status_code=400, detail="Month must be between 1 and 12")
    
    query = select(Student).where(
        and_(
            extract("year", Student.created_at) == year,
            extract("month", Student.created_at) == month
        )
    )
    result = await db.execute(query)
    students = result.scalars().all()

    if not students:
        raise HTTPException(status_code=404, detail="No students found for the given month and year")

    # Форматирование даты и времени
    formatted_students = [
        {
            "id": s.id,
            "name": s.name,
            "last_name": s.last_name,
            "email": s.email,
            "age": s.age,
            "gender": s.gender,
            "child_gender": s.child_gender,
            "phone": s.phone,
            "group_id": s.group_id,
            "date": s.created_at.strftime("%a, %d %b"),  # Пример: "Wed, 07 Feb"
            "time": s.created_at.strftime("%H:%M")       # Пример: "14:30"
        }
        for s in students
    ]

    return formatted_students
