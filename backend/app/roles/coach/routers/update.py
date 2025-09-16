from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete, update
from database import get_session
from crud import CRUD
from roles.coach import schemas
import models
from services.AchievementService import AchievementService
from services.NotificationService import NotificationService

router = APIRouter()


# @router.put("/camps/groups/{id}", response_model=schemas.ResponseOk, tags=["Coach"]) #???
# async def update_group(id: int, data: schemas.GroupUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Group, id, data, session)}

# @router.put("/camp/events/{id}", response_model=schemas.ResponseOk, tags=["Coach"]) #???
# async def update_event(id: int, data: schemas.EventUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Event, id, data, session)}

# @router.put("/camp/coaches/{id}", response_model=schemas.ResponseOk, tags=["Coach"]) #???
# async def update_coach(id: int, data: schemas.CoachUpdate, session: AsyncSession = Depends(get_session)):
#     return {"isOk": await CRUD.update(models.Coach, id, data, session)}

# Attendances
@router.put("/camps/events/attendances/{id}", tags=["Coach"])
async def update_attendance(id: int, data: schemas.AttendanceUpdate, session: AsyncSession = Depends(get_session)):
    response = {"isOk": await CRUD.update(models.Attendance, id, data, session), "notifications": []}
    await update_student_events_attended(session, data.student_id, data.present)

    if data.present == True:
        achievements = await AchievementService.update_participate_achievements(data.student_id, session)
        if achievements["added"] or achievements["updated"]:
            notifications = await NotificationService.send_notifications(session, [{'student_id': data.student_id, **achievements}])
            response["notifications"] = notifications

    return response

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

@router.put("/camps/events/{event_id}/groups/{group_id}/attendances", tags=["Coach"])
async def update_all_attendances(event_id: int, group_id: int, data: schemas.AttendanceUpdate, session: AsyncSession = Depends(get_session)):
    rows = await CRUD.get(models.Attendance, session, filters={"event_id": event_id, "group_id": group_id})
    
    notifications = []
    for row in rows:
        await CRUD.update(models.Attendance, row.id, data, session)
        await update_student_events_attended(session, row.student_id, True)
        
        achievements = await AchievementService.update_participate_achievements(row.student_id, session)
        if achievements["added"] or achievements["updated"]:
            notifications.append({'student_id': row.student_id, **achievements});
    
    notifications_report = []
    if notifications:
        notifications_report = await NotificationService.send_notifications(session, notifications)
           
    return {"isOk": True, 'notifications': notifications_report}

# Test
@router.put("/students/{student_id}/tests/{test_id}", tags=["Coach"])
async def update_student_test(student_id: int, test_id: int, data: schemas.TestUpdate2, session: AsyncSession = Depends(get_session)):
    metric = models.Metric
    
    # if data.exam == 'speed' or data.exam == 'stamina'  or data.exam == 'climbing':
    #     stmt = (
    #         select(metric.score)
    #         .where(
    #             metric.camp_id == data.camp_id,
    #             metric.test == data.exam.capitalize(),
    #             metric.start <= data.value,
    #             metric.stop > data.value
    #         )
    #     )
    #     result = await session.execute(stmt)
    #     score = result.scalar_one_or_none() or 0
    #     fields = schemas.TestUpdate(**{data.exam: score, data.exam + '_time': data.value})
    #     await CRUD.update(models.Test, test_id, fields, session)

    #     achievements = await AchievementService.update_test_achievements(student_id, test_id, session)
    #     if achievements["added"] or achievements["updated"]:
    #         notifications = await NotificationService.send_notifications([{'student_id': student_id, **achievements}])
    #     return {"score": score, 'time': data.value, 'notifications': notifications}
    # else: 
    #     fields = schemas.TestUpdate(**{data.exam: data.value})
    #     await CRUD.update(models.Test, test_id, fields, session)

    #     achievements = await AchievementService.update_test_achievements(student_id, test_id, session)
    #     if achievements["added"] or achievements["updated"]:
    #         notifications = await NotificationService.send_notifications([{'student_id': student_id, **achievements}])
    #     return {"score": data.value, 'notifications': notifications }
    if data.exam in ("speed", "stamina", "climbing"):
        stmt = (
            select(metric.score)
            .where(
                metric.camp_id == data.camp_id,
                metric.test == data.exam.capitalize(),
                metric.start <= data.value,
                metric.stop > data.value,
            )
        )
        result = await session.execute(stmt)
        score = result.scalar_one_or_none() or 0
        fields = schemas.TestUpdate(
            **{data.exam: score, f"{data.exam}_time": data.value}
        )
        await CRUD.update(models.Test, test_id, fields, session)
        response = {"score": score, "time": data.value}
    else:
        fields = schemas.TestUpdate(**{data.exam: data.value})
        await CRUD.update(models.Test, test_id, fields, session)
        response = {"score": data.value}

    achievements = await AchievementService.update_test_achievements(student_id, test_id, session)
    if achievements["added"] or achievements["updated"]:
        notifications = await NotificationService.send_notifications(
            session, [{"student_id": student_id, **achievements}]
        )
        response["notifications"] = notifications

    return response


# Summary
@router.put("/students/{student_id}/tests/summary", response_model=schemas.ResponseOk, tags=["Coach"])
async def update_summary_tests(student_id: int, data: schemas.SummaryTests, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Student, student_id, data, session)}

@router.put("/students/{student_id}/achievements/summary", response_model=schemas.ResponseOk, tags=["Coach"])
async def update_summary_achievements(student_id: int, data: schemas.SummaryAchievements, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Student, student_id, data, session)}

@router.put("/students/{student_id}/games/summary", response_model=schemas.ResponseOk, tags=["Coach"])
async def update_summary_games(student_id: int, data: schemas.SummaryGames, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.Student, student_id, data, session)}

# Drill
@router.put("/camps/events/drills/{drill_id}", response_model=schemas.ResponseOk, tags=["Coach"])
async def update_event_drill(drill_id: int, data: schemas.EventDrillUpdate, session: AsyncSession = Depends(get_session)):
    return {"isOk": await CRUD.update(models.EventDrill, drill_id, data, session)}