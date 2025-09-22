from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models
from sqlalchemy.future import select
from sqlalchemy import delete, update
from services.photo_storage import PhotoStorageService
from services.AchievementService import AchievementService
from services.NotificationService import NotificationService


router = APIRouter()


# Groups
@router.put("/camps/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_camp(id: int, data: schemas.CampUpdate, session: AsyncSession = Depends(get_session)):
    
    if data.name:
        result = await PhotoStorageService.rename_camp_folder(id, data.name, session)
        if not result.isOk:
            raise HTTPException(status_code=result.error_code, detail=result.error_message)

    return {"isOk": await CRUD.update(models.Camp, id, data, session)}


@router.put("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_group(id: int, data: schemas.GroupUpdate, session: AsyncSession = Depends(get_session)):

    if data.name:
        result = await PhotoStorageService.rename_group_folder(id, data.name, session)
        if not result.isOk:
            raise HTTPException(status_code=result.error_code, detail=result.error_message)

    return {"isOk": await CRUD.update(models.Group, id, data, session)}

@router.put("/camps/groups/schedule/{id}", response_model=schemas.ResponseOk, tags=["Manager"])
async def update_group_shedule(id: int, data: schemas.GroupScheduleUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.GroupSchedule, id, data, session)}

@router.put("/camps/groups/schedule/{id}/coach", tags=["Admin_update"])
async def update_group_shedule(id: int, data: schemas.GroupScheduleUpdate, session: AsyncSession = Depends(get_session)):
    await CRUD.update(models.GroupSchedule, id, data, session)
    coach = await CRUD.read(models.Coach, data.coach_id, session)
    return {"name": coach.first_name + ' ' + coach.last_name}

# Student
@router.put("/students/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_student(id: int, data: schemas.StudentUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Student, id, data, session)}

@router.put("/students/parents/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_student_parents(id: int, data: List[schemas.ParentUpdate], session: AsyncSession = Depends(get_session)):
    for parent in data:
        await CRUD.update(models.Parent, parent.id, parent, session)   
    return {"isOk": True}

@router.put("/students/{student_id}/tests/{test_id}", tags=["Admin_update"])
async def update_student_test(student_id: int, test_id: int, data: schemas.TestUpdate2, session: AsyncSession = Depends(get_session)):
    metric = models.Metric
    
    if data.exam == 'speed' or data.exam == 'stamina'  or data.exam == 'climbing':
        stmt = (
            select(metric.score)
            .where(
                metric.camp_id == data.camp_id,
                metric.test == data.exam.capitalize(),
                metric.start <= data.value,
                metric.stop > data.value
            )
        )
        result = await session.execute(stmt)
        score = result.scalar_one_or_none() or 0
        fields = schemas.TestUpdate(**{data.exam: score, data.exam + '_time': data.value})
        await CRUD.update(models.Test, test_id, fields, session)

        achievements_message = await AchievementService.update_test_achievements(student_id, test_id, session)
        if achievements_message["added"] or achievements_message["updated"]:
            notifications = await NotificationService.send_notifications(session, [{'student_id': student_id, **achievements_message}])

        return {"score": score, 'time': data.value, 'achievements': achievements_message}
    else: 
        fields = schemas.TestUpdate(**{data.exam: data.value})
        await CRUD.update(models.Test, test_id, fields, session)

        achievements_message = await AchievementService.update_test_achievements(student_id, test_id, session)
        if achievements_message["added"] or achievements_message["updated"]:
            notifications = await NotificationService.send_notifications(session, [{'student_id': student_id, **achievements_message}])

        return {"score": data.value, 'achievements': achievements_message}


@router.post("/students/{id}/photo", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_student_photo(id: int, file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    return await PhotoStorageService.upload_student_photo(id, file, session)

@router.put("/students/{student_id}/games/{game_id}", tags=["Admin_update"])
async def update_student_game(student_id: int, game_id: int, data: schemas.GameUpdate, session: AsyncSession = Depends(get_session)):
    return {
        "isOk": await CRUD.update(models.Gamer, game_id, data, session),
        "achievements": await AchievementService.update_game_achievements(student_id, game_id, session)
        }

@router.put("/students/achievements/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_achieve(id: int, data: schemas.AchievementUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Achievement, id, data, session)}

@router.put("/students/{id}/password", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_password(id: int, data: schemas.StudentUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Student, id, data, session)}

# Events
@router.put("/camps/events/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_event(id: int, data: schemas.EventUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Event, id, data, session)}

@router.put("/camps/events/attendances/{id}", tags=["Admin_update"])
async def update_attendance(id: int, data: schemas.AttendanceUpdate, session: AsyncSession = Depends(get_session)):
    message = None
    if data.present == True:
        message = await AchievementService.update_participate_achievements(data.student_id, session)

    await update_student_events_attended(session, data.student_id, data.present)

    return {"isOk": await CRUD.update(models.Attendance, id, data, session),
            "achievements": message or ''}

async def update_student_events_attended(session: AsyncSession, student_id: int, present: bool):
    delta = 1 if present else -1

    stmt = (
        update(models.Student)
        .where(models.Student.id == student_id)
        .values(
            events_attended=models.Student.events_attended + delta
        )
    )
    await session.execute(stmt)
    await session.commit()

@router.put("/camps/events/{event_id}/groups/{group_id}/attendances", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_all_attendances(event_id: int, group_id: int, data: schemas.AttendanceUpdate, session: AsyncSession = Depends(get_session)):
    rows = await CRUD.get(models.Attendance, session, filters={"event_id": event_id, "group_id": group_id})
    for row in rows:
        await CRUD.update(models.Attendance, row.id, data, session)
        await AchievementService.update_participate_achievements(row.id, session)
        await update_student_events_attended(session, row.student_id, True)
    return {"isOk": True}


# Achieves
@router.put("/achieves/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_achieve(id: int, data: schemas.AchieveUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Achieve, id, data, session)}

@router.put("/achieves/rules/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_achieve_rules(id: int, data: List[schemas.RuleCreate], session: AsyncSession = Depends(get_session)): 
    await session.execute(delete(models.Rule).where(models.Rule.achieve_id == id))
    await session.commit()
    
    for rule in data:
        await CRUD.add(models.Rule, rule, session)   
    return {"isOk": True}

# @router.post("/achieves/rules/all", response_model=schemas.ResponseOk, tags=["Admin_update"])
# async def update_achieve_rules_all(session: AsyncSession = Depends(get_session)):
#     await session.execute(update(models.Rule).values(type="AND"))
#     await session.commit()
#     return {"isOk": True}

# Photo
@router.post("/camps/coaches/{id}/photo", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_coach_photo(id: int, file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    return await PhotoStorageService.upload_coach_photo(id, file, session)

# Coaches
@router.put("/camps/managers/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_manager(id: int, data: schemas.ManagerUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Manager, id, data, session)}

@router.put("/camps/coaches/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_coach(id: int, data: schemas.CoachUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Coach, id, data, session)}

@router.post("/camps/coaches/{id}/photo", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_coach_photo(id: int, file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    return await PhotoStorageService.upload_coach_photo(id, file, session)


# Drills
@router.put("/drills/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_drill(id: int, data: schemas.DrillUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Drill, id, data, session)}

@router.put("/settings/metrics/{id}", response_model=schemas.ResponseOk, tags=["Admin_update"])
async def update_metric(id: int, data: schemas.MetricUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Metric, id, data, session)}


# Schedule
@router.put("/camps/groups/{id}/new_coach", response_model=schemas.ResponseOk, tags=["Manager"]) #???
async def change_group_coach(id: int, data: schemas.GroupCoachUpdate, session: AsyncSession = Depends(get_session)):
    
    query = select(models.CoachGroup).where(models.CoachGroup.group_id == id)
    result = await session.execute(query)
    entry = result.scalars().first()
    if entry:
        setattr(entry, 'coache_id', data.coach_id)
        await session.commit()
    else:
        new_record = schemas.CoachGroupAdd(coache_id=data.coach_id, group_id=id)
        await CRUD.add(models.CoachGroup, new_record, session)
    
    query = select(models.GroupSchedule).where(models.GroupSchedule.group_id == id)
    result = await session.execute(query)
    schedules = result.scalars().all()

    for item in schedules:
        item.coach_id = data.coach_id

    await session.commit()
    return {"isOk": True}