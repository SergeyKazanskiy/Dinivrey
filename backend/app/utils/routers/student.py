from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import and_, extract
from backend.app.models.events import Student
from database import DBDep
from typing import List
from schemas import StudentResponse

router = APIRouter()


@router.get("/filter_by_month/", response_model=List[StudentResponse])
async def get_students_by_month(year: int, month: int, db: DBDep):
    
    query = select(Student).where(
        and_(
            extract("year", Student.created_at) == year,
            extract("month", Student.created_at) == month
        )
    )
    result = await db.execute(query)
    students = result.scalars().all()
    return students


def create_student(db: Session, student: StudentCreate, group_id: int):
    db_student = Student(name=student.name, group_id=group_id)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@router.post("/", response_model=StudentResponse)
async def create_student(student_data: StudentCreate, db: AsyncSession = Depends(get_db)):
    new_student = Student(
        first_name=student_data.first_name,
        last_name=student_data.last_name,
        age=student_data.age,
        gender=student_data.gender,
        email=student_data.email,
        phone=student_data.phone
    )
    db.add(new_student)
    await db.flush()  

    parents = [
        Parent(name=p.name, email=p.email, phone=p.phone, student_id=new_student.id)
        for p in student_data.parents
    ]
    db.add_all(parents)
    
    await db.commit()
    await db.refresh(new_student)
    return new_student