from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import sessionmaker, declarative_base
from typing import Annotated
from backend.app.routers.admin import router as groups_router
from backend.app.routers.student import router as students_router

# Конфигурация БД
DATABASE_URL = "sqlite+aiosqlite:///./test.db"
TEST_MODE = True  # Если True, БД очищается при каждом запуске

engine = create_async_engine(DATABASE_URL, echo=True)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

Base = declarative_base()

async def get_db() -> AsyncSession:
    async with async_session_maker() as session:
        yield session

DBDep = Annotated[AsyncSession, Depends(get_db)]

app = FastAPI()

# Очистка БД в тестовом режиме
@app.on_event("startup")
async def startup():
    if TEST_MODE:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)

# Подключаем роутеры
app.include_router(groups_router, prefix="/groups", tags=["Groups"])
app.include_router(students_router, prefix="/students", tags=["Students"])


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.events import Student
from schemas import StudentCreate, StudentResponse
from backend.app.main import DBDep

router = APIRouter()

@router.post("/", response_model=StudentResponse)
async def create_student(student: StudentCreate, db: DBDep):
    new_student = Student(name=student.name, group_id=student.group_id)
    db.add(new_student)
    await db.commit()
    await db.refresh(new_student)
    return new_student

@router.get("/{student_id}", response_model=StudentResponse)
async def get_student(student_id: int, db: DBDep):
    student = await db.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.delete("/{student_id}")
async def delete_student(student_id: int, db: DBDep):
    student = await db.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    await db.delete(student)
    await db.commit()
    return {"message": "Student deleted"}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from backend.app.models.events import Group
from schemas import GroupCreate, GroupResponse
from backend.app.main import DBDep

router = APIRouter()

@router.post("/", response_model=GroupResponse)
async def create_group(group: GroupCreate, db: DBDep):
    new_group = Group(name=group.name, created_at=func.now(), updated_at=func.now())
    db.add(new_group)
    await db.commit()
    await db.refresh(new_group)
    return new_group

@router.get("/{group_id}", response_model=GroupResponse)
async def get_group(group_id: int, db: DBDep):
    group = await db.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.put("/{group_id}", response_model=GroupResponse)
async def update_group(group_id: int, group: GroupCreate, db: DBDep):
    existing_group = await db.get(Group, group_id)
    if not existing_group:
        raise HTTPException(status_code=404, detail="Group not found")
    existing_group.name = group.name
    existing_group.updated_at = func.now()
    await db.commit()
    await db.refresh(existing_group)
    return existing_group

@router.delete("/{group_id}")
async def delete_group(group_id: int, db: DBDep):
    group = await db.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    await db.delete(group)
    await db.commit()
    return {"message": "Group deleted"}


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from backend.app.models.events import Student
from schemas import StudentCreate, StudentUpdate, StudentResponse
from backend.app.main import DBDep

router = APIRouter()

@router.post("/", response_model=StudentResponse)
async def create_student(student: StudentCreate, db: DBDep):
    new_student = Student(
        name=student.name,
        last_name=student.last_name,
        email=student.email,
        age=student.age,
        gender=student.gender,
        phone=student.phone,
        group_id=student.group_id,
        created_at=func.now(),
        updated_at=func.now()
    )
    db.add(new_student)
    await db.commit()
    await db.refresh(new_student)
    return new_student

@router.get("/{student_id}", response_model=StudentResponse)
async def get_student(student_id: int, db: DBDep):
    student = await db.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.put("/{student_id}", response_model=StudentResponse)
async def update_student(student_id: int, student: StudentUpdate, db: DBDep):
    existing_student = await db.get(Student, student_id)
    if not existing_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    update_data = student.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(existing_student, key, value)
    existing_student.updated_at = func.now()
    
    await db.commit()
    await db.refresh(existing_student)
    return existing_student

@router.delete("/{student_id}")
async def delete_student(student_id: int, db: DBDep):
    student = await db.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    await db.delete(student)
    await db.commit()
    return {"message": "Student deleted"}

