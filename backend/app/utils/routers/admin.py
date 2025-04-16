from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.group import GroupCreate, GroupResponse
from crud import create_group, get_groups
from typing import List

router = APIRouter()

# Get
@router.get("/groups", response_model=list[schemas.Group])
def read_groups(include_students: bool = False, db: Session = Depends(get_db)):
    return services.get_groups(db, include_students)



@router.post("/", response_model=GroupResponse)
def create_new_group(group: GroupCreate, db: Session = Depends(get_db)):
    return create_group(db, group)

@router.get("/", response_model=List[GroupResponse])
def read_groups(db: Session = Depends(get_db)):
    return get_groups(db)
