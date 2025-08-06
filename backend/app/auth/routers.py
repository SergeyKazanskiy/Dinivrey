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


load_dotenv()

firebase_key_path = os.getenv("FIREBASE_KEY_PATH")
if not firebase_key_path:
    raise RuntimeError("FIREBASE_KEY_PATH not set")

cred = credentials.Certificate('./secrets/firebase-key.json')
firebase_admin.initialize_app(cred)
# db = firestore.Client()


async def get_decoded_token(authorization: str = Header(...)) -> dict:
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Bearer token")
    
    id_token = authorization.split(" ")[1]
    #print('!!!!_' + id_token)
    try:
        decoded_token = auth.verify_id_token(id_token)
        #print("DECODED:", decoded_token)
    except Exception as e:
        #print("VERIFY ERROR:", repr(e))
        raise HTTPException(status_code=401, detail="Invalid token")

    return decoded_token



router = APIRouter()

@router.post("/auth/admin/verify", response_model=schemas.ResponseId, tags=["Auth"])
async def user_phone_verify(
        decoded_token: dict = Depends(get_decoded_token),
    ):

    email = decoded_token.get("email")
    uid = decoded_token.get("uid")
    if not email:
        raise HTTPException(400, detail="Email missing in token")

    # doc = db.collection("roles").document("adminEmails").get()
    # admin_emails = doc.to_dict() if doc.exists else {}
    # is_admin = admin_emails.get(email, False)

    # if not is_admin:
    #     raise HTTPException(status_code=403, detail="Email not allowed")

    auth.set_custom_user_claims(uid, {"admin": True})
    return {"isOk": True}


@router.post("/user/login", response_model=schemas.ResponseId, tags=["Auth"])
async def user_login(
        data: schemas.RoleBase,
        decoded_token: dict = Depends(get_decoded_token),
        session: AsyncSession = Depends(get_session)
    ):
    
    phone = decoded_token.get("phone_number")
    if not phone:
        raise HTTPException(400, detail="Phone number missing in token")

    if data.role == 'manager': model = models.Coach
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

# @router.post("/auth/student/verify", response_model=schemas.ResponseId, tags=["Auth"])
# async def auth_student_phone_verify(
#         decoded_token: dict = Depends(get_decoded_token),
#         session: AsyncSession = Depends(get_session)
#     ):

#     phone = decoded_token.get("phone_number")
#     if not phone:
#         raise HTTPException(400, detail="Phone number missing in token")

#     user = await session.scalar(
#         select(models.Student).where(models.Student.phone == phone)
#     )
#     if not user:
#         raise HTTPException(404, detail="User with this phone not found")

#     user.firebase_uid = decoded_token["uid"]
#     user.active = True

#     await session.commit()
#     return {"id": user.id}


# @router.post("/auth/coach/verify", response_model=schemas.ResponseId, tags=["Auth"])
# async def user_phone_verify(
#         decoded_token: dict = Depends(get_decoded_token),
#         session: AsyncSession = Depends(get_session)
#     ):

#     phone = decoded_token.get("phone_number")
#     if not phone:
#         raise HTTPException(400, detail="Phone number missing in token")

#     user = await session.scalar(
#         select(models.Coach).where(models.Coach.phone == phone)
#     )
#     if not user:
#         raise HTTPException(404, detail="User with this phone not found")

#     user.firebase_uid = decoded_token["uid"]
#     user.active = True

#     await session.commit()
#     return {"id": user.id}


# @router.post("/auth/manager/verify", response_model=schemas.ResponseOk, tags=["Auth"])
# async def user_phone_verify(
#         decoded_token: dict = Depends(get_decoded_token),
#     ):

#     phone = decoded_token.get("phone_number")
#     if not phone:
#         raise HTTPException(400, detail="Phone number missing in token")

#     doc = db.collection("roles").document("managerPhones").get()
#     manager_phones = doc.to_dict() if doc.exists else {}
#     is_manager = manager_phones.get(phone, False)

#     if not is_manager:
#         raise HTTPException(status_code=403, detail="Your number is not on the list of allowed numbers for the project")
        
#     return {"isOk": True}



# # now = time.time()
        # if email in blocked_emails and blocked_emails[email] > now:
        #     wait = int(blocked_emails[email] - now)
        #     raise HTTPException(status_code=403, detail=f"Access denied. Try again in {wait} seconds.")

# blocked_emails: dict[str, float] = {}
# BLOCK_TIME = 300

# @router.get("/test/firebase")
# def read_firebase():
#     return {"message": "Firebase Admin Initialized"}
# blocked_emails[email] = now + BLOCK_TIME