from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc, asc, or_, func
from typing import List
from database import get_session
from crud import CRUD
from roles.manager import schemas
import models
from utils.timeFunctions import get_week_range, get_current_week_range, get_week_number, get_month_range

router = APIRouter()


# Coaches
@router.get("/coaches", response_model=List[schemas.CoachShortResponse], tags=["Manager"])
async def get_coaches(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Coach, session)


# Events
@router.get("/camps", response_model=List[schemas.CampResponse], tags=["Manager"])
async def get_camps(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Camp, session)

@router.get("/camps/{id}/groups", response_model=List[schemas.GroupResponse], tags=["Manager"])
async def get_camp_groups(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Group, session, filters={"camp_id": id}, order_by="name")

@router.get("/camps/groups/{group_id}/events",  response_model=List[schemas.GroupEventsResponse], tags=["Manager"])
async def get_group_events(year: int, month: int, group_id: int, session: AsyncSession = Depends(get_session)):
    month_start, month_end = get_month_range(year, month)
    
    start_ts = int(month_start.timestamp() * 1000)
    end_ts = int(month_end.timestamp() * 1000)
    event = models.Event

    result = await session.execute(
        select(event.id, event.timestamp, event.type, event.desc)
            .where(event.timestamp.between(start_ts, end_ts),
                or_(
                        event.group1_id == group_id,
                        event.group2_id == group_id
                    ))
            .order_by(asc(event.timestamp))
    )
    return result.all()

@router.get("/camps/groups/events",  response_model=List[schemas.EventResponse], tags=["Manager"])
async def get_coach_events(year: int, month: int, week: int, group_ids: List[int] = Query(...), session: AsyncSession = Depends(get_session)):
    week_start, week_end = get_week_range(year, month, week)
    # print('!!!!!', week_start, week_end)
    start_ts = int(week_start.timestamp() * 1000)
    end_ts = int(week_end.timestamp() * 1000)
    
    result = await session.execute(
        select(models.Event)
            .where(models.Event.timestamp.between(start_ts, end_ts),
                or_(
                        models.Event.group1_id.in_(group_ids),
                        models.Event.group2_id.in_(group_ids)
                    ))
            .order_by(asc(models.Event.timestamp))
    )
    return result.scalars().all()

@router.get("/camps/events/{event_id}/groups/{group_id}/attendances", tags=["Manager"])
async def get_attendances(event_id:int, group_id: int, session: AsyncSession = Depends(get_session)):
    A = models.Attendance
    S = models.Student
    stmt = (
        select(A.id, A.student_id, S.first_name, S.last_name, A.present, A.comment)
            .join(S, A.student_id == S.id)
            .where((A.group_id == group_id) & (A.event_id == event_id))
            .order_by(asc(S.first_name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"id": row[0],
             "student_id": row[1],
             "first_name": row[2],
             "last_name": row[3],
             "present": row[4],
             "comment": row[5]} for row in rows]

# @router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentShort], tags=["Manager"])
# async def get_students(id: int, session: AsyncSession = Depends(get_session)):
#     return await CRUD.read(models.Student, id, session)

# @router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Manager"])
# async def get_student(id: int, session: AsyncSession = Depends(get_session)):
#     return await CRUD.read(models.Student, id, session)