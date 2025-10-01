from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import delete, update
from sqlalchemy.engine import CursorResult
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models
from services.photo_storage import PhotoStorageService
from services.NotificationService import NotificationService

router = APIRouter()


# Groups
@router.delete("/camps/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_camp(id: int, session: Session = Depends(get_session)):

    result = await PhotoStorageService.delete_camp_folder(id, session)
    if not result.isOk:
        raise HTTPException(status_code=result.error_code, detail=result.error_message)
    
    return {"isOk": await CRUD.delete(models.Camp, id, session)}
        

@router.delete("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_group(id: int, session: Session = Depends(get_session)):

    result = await PhotoStorageService.delete_group_folder(id, session)
    if not result.isOk:
        raise HTTPException(status_code=result.error_code, detail=result.error_message)

    return {"isOk": await CRUD.delete(models.Group, id, session)}

@router.delete("/camps/groups/students/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_student(id: int, session: Session = Depends(get_session)):

    result = await PhotoStorageService.delete_student_photo(id, session)
    if not result.isOk:
       raise HTTPException(status_code=result.error_code, detail=result.error_message)

    return {"isOk": await CRUD.delete(models.Student, id, session)}

@router.delete("/camps/groups/schedule/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_student(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.GroupSchedule, id, session)}

# Student
@router.delete("/students/tests/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_student_test(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Test, id, session)}

@router.delete("/students/games/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_student_game(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Gamer, id, session)}

@router.delete("/students/achievements/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def remove_student_achievement(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Achievement, id, session)}

# Notifications
@router.delete("/students/{id}/notifications", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_student_notifications(id: int, session: Session = Depends(get_session)):
    return {"isOk": await NotificationService.delete_notifications(id, session)}

# Achieves
@router.delete("/achieves/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_achieve(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Achieve, id, session)}

@router.delete("/achieves/rules/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_achieve(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Rule, id, session)}


# Events
@router.delete("/camps/events/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_event(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Event, id, session)}

@router.delete("/camps/events/{event_id}/groups/{group_id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_attendance(event_id: int, group_id: int, session: Session = Depends(get_session)):
    stmt = (
        delete(models.Attendance)
        .where(
            models.Attendance.event_id == event_id,
            models.Attendance.group_id == group_id
        )
    )
    await session.execute(stmt)
    await session.commit()
    return {"isOk": True}

# Coaches
@router.delete("/camps/managers/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_manager(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Manager, id, session)}

@router.delete("/camps/coaches/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_coach(id: int, session: Session = Depends(get_session)):

    res = await PhotoStorageService.delete_coach_photo(id, session)
    if not res.isOk:
        raise HTTPException(status_code=res.error_code, detail=res.error_message)

    await session.execute(
        update(models.GroupSchedule)
        .where(models.GroupSchedule.coach_id == id)
        .values(coach_id=0)
    )

    result: CursorResult = await session.execute(
        delete(models.Coach).where(models.Coach.id == id)
    )

    await session.commit()
    
    return {"isOk": result.rowcount > 0}


@router.delete("/camps/coaches/groups/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def remove_coach_group(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.CoachGroup, id, session)}


# Drills
@router.delete("/drills/{id}", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_drill(id: int, session: Session = Depends(get_session)):
    return {"isOk": await CRUD.delete(models.Drill, id, session)}

@router.delete("/settings/metrics/all", response_model=schemas.ResponseOk, tags=["Admin_delete"])
async def delete_all_metrics(session: Session = Depends(get_session)):
    await session.execute(delete(models.Metric))
    await session.commit()
    return {"isOk": True}