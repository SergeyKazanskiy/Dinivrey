from typing import Type, List, Optional
from sqlalchemy import select
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import HTTPException
import models
import schemas

from sqlalchemy.orm import joinedload
from sqlalchemy import select


def get_groups_with_students(db: Session):
    stmt = (
        select(models.Group)
        .options(joinedload(models.Group.students))
        .order_by(models.Group.name)
    )
    groups = db.execute(stmt).scalars().all()

    for group in groups:
        group.students.sort(key=lambda student: student.name)

    return groups


def get_students_by_group(db: Session, group_id: int, schema: Type[BaseModel]) -> List[BaseModel]:

    stmt = select(models.Student).where(models.Student.group_id == group_id)
    students = db.execute(stmt).scalars().all()
   
    return [schema.model_validate(student) for student in students]


def get_groups(db: Session, include_students: bool = False):
    if include_students:
        return db.query(models.Group).options(models.Group.students).all()
    return db.query(models.Group).all()


def create_group(db: Session, group: schemas.GroupCreate):
    db_group = models.Group(name=group.name)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

def delete_group(db: Session, group_id: int) -> bool:
    group = db.get(models.Group, group_id)
    if not group:
        return False
    db.delete(group)
    db.commit()
    return True


 #group = db.query(models.Group).filter(models.Group.id == group_id).first()
 #   if not group:
 #       raise HTTPException(status_code=404, detail="Группа не найдена")
 # def get_groups_with_students(db: Session):
  #  return db.query(models.Group).options(models.Group.students).all()