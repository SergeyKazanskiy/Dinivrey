from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import asc, func
from database import get_session
from crud import CRUD
from roles.manager import schemas 
import models
from datetime import datetime
from jinja2 import Environment, FileSystemLoader
from typing import List
from fastapi.responses import JSONResponse
from pathlib import Path
import base64
import os
from .read import get_coache_groups

router = APIRouter()


# Events
@router.post("/camps/events", response_model=schemas.ResponseId, tags=["Manager"])
async def create_event(data: schemas.EventCreate, session: AsyncSession = Depends(get_session)):
    return {"id": await CRUD.add(models.Event, data, session)}

@router.post("/camps/coaches/groups", response_model=List[schemas.CoachGroupResponse], tags=["Manager"])
async def coach_group_add(data: schemas.CoachGroupAdd, session: AsyncSession = Depends(get_session)):
    id = await CRUD.add(models.CoachGroup, data, session)
    return await get_coache_groups(data.coache_id, session)


# @router.post("/coaches/upload-signature", response_model=schemas.ResponseOk, tags=["Coach"])
# async def upload_coache_signature(data: schemas.SignatureUpload):
#     try:
#         header, b64data = data.image.split(",")
#         file_data = base64.b64decode(b64data)
#         filepath = os.path.join("roles/coach/signatures", data.file_name)

#         with open(filepath, "wb") as f:
#             f.write(file_data)
#         return {"isOk": True}
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"isOk": False, "error": str(e)})


# @router.post("/camps/groups", response_model=schemas.ResponseId, tags=["Manager"]) #camp_id ???
# async def create_group(data: schemas.GroupCreate, session: AsyncSession = Depends(get_session)):
#     return {"id": await CRUD.add(models.Group, data, session)}





# @router.post("/achieves", response_model=schemas.ResponseId, tags=["Manager"])
# async def create_achieve(data: schemas.AchieveCreate, session: AsyncSession = Depends(get_session)):
#     return {"id": await CRUD.add(models.Achieve, data, session)} 

# @router.post("/coaches", response_model=schemas.ResponseId, tags=["Manager"])
# async def create_coach(data: schemas.CoachCreate, session: AsyncSession = Depends(get_session)):
#     return {"id": await CRUD.add(models.Coach, data, session)} 