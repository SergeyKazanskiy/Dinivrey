from fastapi import FastAPI, Request, HTTPException, APIRouter, Depends, Header
import firebase_admin
from firebase_admin import auth, credentials, initialize_app
from google.cloud import firestore
import time
from dotenv import load_dotenv
import os
from . import schemas
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
import models
from sqlalchemy.future import select
from .auth_utils import get_decoded_token


load_dotenv()

firebase_key_path = os.getenv("FIREBASE_KEY_PATH")
if not firebase_key_path:
    raise RuntimeError("FIREBASE_KEY_PATH not set")

cred = credentials.Certificate('./secrets/firebase-key.json')
firebase_admin.initialize_app(cred)


router = APIRouter()

@router.post("/user/login", response_model=schemas.ResponseId, tags=["Auth"])
async def user_login(
        data: schemas.RoleBase,
        decoded_token: dict = Depends(get_decoded_token),
        session: AsyncSession = Depends(get_session)
    ):
    
    phone = decoded_token.get("phone_number")
    if not phone:
        raise HTTPException(400, detail="Phone number missing in token")
  
    if data.role == 'manager': model = models.Manager
    elif data.role == 'coach': model = models.Coach
    else: model = models.Student

    user = await session.scalar(
        select(model).where(model.phone == phone)
    )
    if not user:
        raise HTTPException(404, detail="User with this phone not found")

    user.firebase_uid = decoded_token["uid"]

    await session.commit()
    return {"id": user.id}


@router.delete("/user/{role}/logout", response_model=schemas.ResponseOk, tags=["Auth"])
async def user_logout(
        role: str, 
        decoded_token: dict = Depends(get_decoded_token),
        session: AsyncSession = Depends(get_session)
    ):

    phone = decoded_token.get("phone_number")
    if not phone:
        raise HTTPException(400, detail="Phone number missing in token")

    if role == 'manager': model = models.Coach
    elif role == 'coach': model = models.Coach
    else: model = models.Student

    user = await session.scalar(
        select(model).where(model.phone == phone)
    )
    if not user:
        raise HTTPException(404, detail="User with this phone not found")

    user.firebase_uid = None

    await session.commit()
    return {"isOk": True}


@router.post("/student/login", tags=["Auth"])
async def login(data: schemas.LoginRequest, session: AsyncSession = Depends(get_session)):
    Student = models.Student
    Parent = models.Parent

    stmt = (
        select(Student)
        .join(Parent, Parent.student_id == Student.id)
        .where((Student.password == data.password) & (Parent.email == data.email))
    )
    result = await session.execute(stmt)
    student = result.scalar_one_or_none()

    if not student:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    firebase_token = auth.create_custom_token(str(student.password))

    return {
        "id_student": student.id,
        "token": firebase_token.decode("utf-8")
    }
