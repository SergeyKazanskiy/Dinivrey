from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD
from roles.manager import schemas
import models

router = APIRouter()


# Events
@router.put("/camps/events/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def update_event(id: int, data: schemas.EventUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Event, id, data, session)}

# @router.put("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_group(id: int, data: schemas.GroupUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Group, id, data, session)}

# @router.put("/camps/groups/students/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_student(id: int, data: schemas.StudentUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Student, id, data, session)}

# @router.put("student/{id}/parents", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_student_address(id: int, data: schemas.ParentCreate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Parent, id, data, session)}

# @router.put("camp/events/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_event(id: int, data: schemas.EventUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Event, id, data, session)}

@router.put("/coaches/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def update_coach(id: int, data: schemas.CoachUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Coach, id, data, session)}

# @router.put("achieves/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
# async def update_achieve(id: int, data: schemas.AchieveUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Achieve, id, data, session)}
