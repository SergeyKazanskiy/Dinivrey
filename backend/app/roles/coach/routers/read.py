from fastapi import APIRouter, Query, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import get_session
from crud import CRUD
from roles.coach import schemas
import models
from datetime import datetime, timedelta
from sqlalchemy.future import select
from sqlalchemy import desc, asc, or_

router = APIRouter()


# Groups
@router.get("/camps/groups", response_model=List[schemas.GroupResponse], tags=["Coach"])
async def get_camp_groups(coach_id: int, session: AsyncSession = Depends(get_session)):
    G = models.Group
    C = models.CoachGroup
    stmt = (
        select(G.id, G.name, G.description, G.camp_id)
        .join(C, C.group_id == G.id )
        .where(C.coache_id == coach_id )
        .order_by(asc(G.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"id": row[0],
             "name": row[1],
             "description": row[2],
             "camp_id": row[3]} for row in rows]


@router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentShort], tags=["Coach"])
async def get_students(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": id}, order_by="first_name")


# Student
@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Coach"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/students/{id}/parents", response_model=List[schemas.ParentResponse], tags=["Coach"])
async def get_student_parents(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Parent, session, filters={"student_id": id})


# Statistics
@router.get("/students/{id}/tests/last/date", tags=["Coach"])
async def get_last_test_date(id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.Test)
        .where(models.Test.student_id == id)
        .order_by(desc(models.Test.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt)
    event = result.scalar_one_or_none()
    isEvents = True if event else False
    timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)
    return {"year": date.year, "month": date.month, "isEvents": isEvents}

@router.get("/students/{id}/games/last/date", tags=["Coach"])
async def get_last_game_date(id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.Game)
        .where(models.Game.student_id == id)
        .order_by(desc(models.Game.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt)
    event = result.scalar_one_or_none()
    isEvents = True if event else False
    timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)
    return {"year": date.year, "month": date.month, "isEvents": isEvents}

@router.get("/students/{id}/tests", response_model=List[schemas.TestResponse], tags=["Coach"])
async def get_student_tests(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Test).where(models.Test.timestamp.between(start_ts, end_ts), models.Test.student_id == id)
    )
    return result.scalars().all()

@router.get("/students/{id}/games", response_model=List[schemas.GameResponse], tags=["Coach"])
async def get_student_games(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Game).where(models.Game.timestamp.between(start_ts, end_ts), models.Game.student_id == id)
    )
    return result.scalars().all()


# Achievements
@router.get("/students/{id}/achievements", response_model=List[schemas.AchieveResponse], tags=["Coach"])
async def get_student_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(S.id, A.image, A.name, S.in_profile, A.category, S.level, A.effect, A.id)
        .join(A, S.achieve_id == A.id )
        .where( S.student_id == id )
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [ schemas.AchieveResponse(
                id = row[0],
                image = row[1],
                name = row[2],
                in_profile = row[3],
                category = row[4],
                level = row[5],
                effect = row[6],
                achieve_id = row[7],
            ) for row in rows]

@router.get("/achieves", response_model=List[schemas.AchievementResponse], tags=["Coach"])
async def get_achieves(category: str, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session, filters={"category": category})

# Events
@router.get("/camps/groups/events/latest", tags=["Coach"])
async def get_latest_event( group_ids: List[int] = Query(...), session: AsyncSession = Depends(get_session)):
    
    result = await session.execute(select(models.Event)
                                   .where(or_(
                                            models.Event.group1_id.in_(group_ids),
                                            models.Event.group2_id.in_(group_ids)
                                        ))
                                   .order_by(desc(models.Event.timestamp))
                                   .limit(1))
    event = result.scalar_one_or_none() 
    isEvents = True if event else False
    timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)
    return {"year":  date.year, "month": date.month, "week": (date.day - 1) // 7, "isEvents": isEvents}

@router.get("/camps/groups/events",  response_model=List[schemas.EventResponse], tags=["Coach"])
async def get_events(year: int, month: int, week: int, group_ids: List[int] = Query(...), session: AsyncSession = Depends(get_session)):
    week_start = datetime(year, month, 1) + timedelta(days=week * 7)
    week_end = week_start + timedelta(days=6, hours=23, minutes=59)
    
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

# Attendances
@router.get("/camps/events/{event_id}/groups/{group_id}/attendances", tags=["Coach"])
async def get_attendances(event_id:int, group_id: int, session: AsyncSession = Depends(get_session)):
    A = models.Attendance
    S = models.Student
    stmt = (
        select(A.id, A.student_id, S.first_name, S.last_name, A.present)
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
             "present": row[4]} for row in rows]


@router.get("/camps/groups/{group_id}/students/names", response_model=List[schemas.StudentName], tags=["Coach"]) #
async def get_student_names(group_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": group_id}, order_by="first_name")

# Testers
@router.get("/camps/events/{event_id}/groups/{group_id}/testers", response_model=List[schemas.Tester], tags=["Coach"]) #
async def get_student_names(event_id: int, group_id: int, session: AsyncSession = Depends(get_session)):
    A = models.Attendance
    S = models.Student
    stmt = (
        select(A.id, A.student_id, S.first_name, S.last_name, A.present)
        .join(S, A.student_id == S.id)
        .where((A.event_id == event_id) & (A.group_id == group_id) & (A.present == True))
        .order_by(asc(S.first_name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    
    liders = []
    for row in rows:
        tests = await session.execute(
            select(models.Test)
            .where(models.Test.student_id == row[1]) #& ((models.Test.timestamp == )
            .order_by(desc(models.Test.timestamp))
            .limit(1)
            )
        test = tests.scalar_one_or_none()
        if test:
            lider = {
                'id': row[1],
                'first_name': row[2],
                'last_name': row[3],

                'test_id': test.id,
                'speed': test.speed,
                'stamina': test.stamina,
                'climbing': test.climbing,
                'evasion': test.evasion,
                'hiding': test.hiding,  
            }
            liders.append(lider)
    return liders

@router.get("/camps/groups/{group_id}/testers2", response_model=List[schemas.Tester], tags=["Coach"]) #
async def get_student_names(group_id: int, session: AsyncSession = Depends(get_session)):
    students = await CRUD.get(models.Student, session, filters={"group_id": group_id}, order_by="first_name")
    
    
    liders = []
    for student in students:
        tests = await session.execute(
            select(models.Test)
            .where(models.Test.student_id == student.id)
            .order_by(desc(models.Test.timestamp))
            .limit(1))
        test = tests.scalar_one_or_none()
        if test:
            lider = {
                'id': student.id,
                'first_name': student.first_name,
                'last_name': student.last_name,

                'test_id': test.id,
                'speed': test.speed,
                'stamina': test.stamina,
                'climbing': test.climbing,
                'evasion': test.evasion,
                'hiding': test.hiding,  
            }
            liders.append(lider)
    return liders
