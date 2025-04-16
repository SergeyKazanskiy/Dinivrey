from typing import Type, List, Optional
from sqlalchemy import select
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import HTTPException
import models
import schemas

from sqlalchemy.orm import joinedload
from sqlalchemy import select



def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: int, updates: dict):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        return False
    for key, value in updates.items():
        if hasattr(student, key):
            setattr(student, key, value)
    db.commit()
    return True

def delete_student(db: Session, student_id: int) -> bool:
    student = db.get(models.Student, student_id)
    if not student:
        return False
    db.delete(student)
    db.commit()
    return True