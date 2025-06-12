from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, Session, sessionmaker
from sqlalchemy import create_engine
from pydantic import BaseModel
from typing import List

# Database setup
#DATABASE_URL = "sqlite:///./test.db"
DATABASE_URL = 'sqlite+aiosqlite:///database.db'
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class Group(Base):
    __tablename__ = "groups"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    students = relationship("Student", back_populates="group", cascade="all, delete")

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"))
    group = relationship("Group", back_populates="students")

# Create tables
Base.metadata.create_all(bind=engine)

# Schemas
class StudentBase(BaseModel):
    name: str

class StudentCreate(StudentBase):
    pass

class StudentResponse(StudentBase):
    id: int
    group_id: int

    class Config:
        from_attributes = True

class GroupBase(BaseModel):
    name: str

class GroupCreate(GroupBase):
    pass

class GroupResponse(GroupBase):
    id: int
    students: List[StudentResponse] = []

    class Config:
        from_attributes = True

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# FastAPI app
app = FastAPI()

# CRUD Endpoints
@app.post("/groups/", response_model=GroupResponse)
def create_group(group: GroupCreate, db: Session = Depends(get_db)):
    db_group = Group(name=group.name)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

@app.get("/groups/", response_model=List[GroupResponse])
def get_groups(db: Session = Depends(get_db)):
    return db.query(Group).all()

@app.delete("/groups/{group_id}")
def delete_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    db.delete(group)
    db.commit()
    return {"message": "Group deleted"}

@app.post("/students/", response_model=StudentResponse)
def create_student(student: StudentCreate, group_id: int, db: Session = Depends(get_db)):
    db_student = Student(name=student.name, group_id=group_id)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@app.get("/students/", response_model=List[StudentResponse])
def get_students(db: Session = Depends(get_db)):
    return db.query(Student).all()

