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
    Group = models.Group
    Coach = models.CoachGroup
    Camp = models.Camp
    stmt = (
        select(Group.id, Group.name, Group.description, Group.camp_id, Camp.name.label("camp_name"))
        .join(Coach, Coach.group_id == Group.id )
        .join(Camp, Group.camp_id == Camp.id)
        .where(Coach.coache_id == coach_id )
        .order_by(asc(Group.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"id": row[0],
             "name": row[1],
             "description": row[2],
             "camp_id": row[3],
             "camp_name": row[4]} for row in rows]


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

@router.get("/students/{id}/coach/comments", response_model=List[schemas.CoachResponse], tags=["Coach"])
async def get_student_coach_comments(id: int, session: AsyncSession = Depends(get_session)):
    Event = models.Event
    Attendance = models.Attendance
    stmt = (
        select(Event.timestamp, Attendance.comment)
            .join(Attendance, Attendance.event_id == Event.id)
            .where(Attendance.student_id == id, Attendance.comment != None)
            .order_by(asc(Event.timestamp))
            .limit(10)
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"timestamp": row[0],
             "comment": row[1]} for row in rows]

@router.get("/students/{id}/tests/last", response_model=List[schemas.TestResponse], tags=["Student"])
async def get_last_test(id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.Test)
        .where(models.Test.student_id == id)
        .order_by(desc(models.Test.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt)
    event = result.scalar_one_or_none()
    return [event] if event else []

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


# Schedule
@router.get("/camps/groups/schedule", tags=["Coach"])
async def get_coache_schedule( group_ids: List[int] = Query(...), session: AsyncSession = Depends(get_session)):
    week_start, week_end = get_current_week_range()

    start_ts = int(week_start.timestamp() * 1000)
    end_ts = int(week_end.timestamp() * 1000)

    events = await session.execute(
        select(models.Event)
            .where(models.Event.timestamp.between(start_ts, end_ts),
                or_(
                        models.Event.group1_id.in_(group_ids),
                        models.Event.group2_id.in_(group_ids)
                    ))
            .order_by(asc(models.Event.timestamp))
    )

    schedule = await session.execute(
        select(models.GroupSchedule)
            .where(models.GroupSchedule.group_id.in_(group_ids))
            .order_by(desc(models.GroupSchedule.weekday),
                      desc(models.GroupSchedule.hour),
                      desc(models.GroupSchedule.minute))
    )
    return {'events': events.scalars().all(),
            'schedules': schedule.scalars().all()}

# Events
@router.get("/camps/groups/events/latest", tags=["Coach"])
async def get_latest_event( group_ids: List[int] = Query(...), session: AsyncSession = Depends(get_session)):
    
    result = await session.execute(
        select(models.Event)
            .where(or_(
                    models.Event.group1_id.in_(group_ids),
                    models.Event.group2_id.in_(group_ids)
                ), models.Event.timestamp < int(datetime.now().timestamp() * 1000))
            .order_by(desc(models.Event.timestamp))
            .limit(1))
    event = result.scalar_one_or_none() 
    isEvents = True if event else False
    timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)
    weekNumber = get_week_number(timestamp)
    return {"year":  date.year, "month": date.month, "week": weekNumber, "isEvents": isEvents}

@router.get("/camps/groups/events",  response_model=List[schemas.EventResponse], tags=["Coach"])
async def get_events(year: int, month: int, week: int, group_ids: List[int] = Query(...), session: AsyncSession = Depends(get_session)):
    week_start, week_end = get_week_range(year, month, week)
    print('!!!!!', week_start, week_end)
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
#GET /coach_api/camps/groups/events?year=2025&month=5&week=3&group_ids=3&group_ids=4
@router.get("/camps/groups/events/competitions",  response_model=List[schemas.EventResponse], tags=["Coach"])
async def get_coach_competitions(group_ids: List[int] = Query(...), session: AsyncSession = Depends(get_session)):
    now_ts = int(datetime.now().timestamp() * 1000)

    result = await session.execute(
        select(models.Event)
            .where(models.Event.timestamp > now_ts,
                models.Event.type == 'Game',
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


@router.get("/camps/groups/{group_id}/students/names", response_model=List[schemas.StudentName], tags=["Coach"]) #
async def get_student_names(group_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": group_id}, order_by="first_name")

# Testers
@router.get("/camps/events/{event_id}/groups/{group_id}/testers", response_model=List[schemas.Tester], tags=["Coach"]) #
async def get_student_names(event_id: int, group_id: int, timestamp: int, session: AsyncSession = Depends(get_session)):
    E = models.Event
    A = models.Attendance
    S = models.Student
    stmt = (
        select(A.id, A.student_id, S.first_name, S.last_name, A.present, E.timestamp )
            .join(A, A.event_id == E.id)
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
                .where((models.Test.student_id == row[1]) & (E.timestamp == timestamp))
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
        else:
            lider = {
                'id': row[1],
                'first_name': row[2],
                'last_name': row[3],

                'test_id': 0,
                'speed': 0,
                'stamina': 0,
                'climbing': 0,
                'evasion': 0,
                'hiding': 0,  
            }
            liders.append(lider)   
    return liders

@router.get("/camps/groups/{group_id}/testers2", response_model=List[schemas.Tester], tags=["Coach"]) #
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

# Drills
@router.get("/camps/events/{event_id}/drills", tags=["Coach"])
async def get_event_drills(event_id: int, session: AsyncSession = Depends(get_session)):
    Drill = models.Drill
    ED = models.EventDrill
    stmt = (
        select(ED.id, Drill.id, Drill.name, Drill.time, Drill.level, Drill.category, Drill.actors, ED.completed)
            .join(Drill, ED.drill_id == Drill.id)
            .where(ED.event_id == event_id)
            .order_by(asc(Drill.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"id": row[0],
             "drill_id": row[1],
             "name": row[2],
             "time": row[3],
             "level": row[4],
             "category": row[5],
             "actors": row[6],
             "completed": row[7]} for row in rows]


@router.get("/drills/all", response_model=List[schemas.ShortDrillResponse], tags=["Coach"])
async def get_base_drills(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Drill, session)

@router.get("/drills/{id}", response_model=schemas.DrillResponse, tags=["Coach"])
async def get_base_drill(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Drill, id, session)


# Functions

def get_week_range(year: int, month: int, week_number: int):
    # Первый и последний день месяца
    first_day = datetime(year, month, 1)
    next_month = datetime(year, month + 1, 1) if month < 12 else datetime(year + 1, 1, 1)
    last_day = next_month - timedelta(days=1)

    # Найдём первый понедельник, который может пересекаться с месяцем
    # Это понедельник на неделе, содержащей первый день месяца
    first_monday = first_day - timedelta(days=first_day.weekday())

    # Смещаемся на (week_number - 1) недель от этого понедельника
    week_start = first_monday + timedelta(weeks=week_number - 1)
    week_end = week_start + timedelta(days=6)

    # Если неделя полностью после месяца — её нет
    if week_start > last_day:
        return None

    # Обрезаем границами месяца
    range_start = max(week_start, first_day)
    range_end = min(week_end, last_day)

    # Устанавливаем точное время
    range_start = range_start.replace(hour=0, minute=0, second=0, microsecond=0)
    range_end = range_end.replace(hour=23, minute=59, second=0, microsecond=0)

    return range_start, range_end

def get_week_number(timestamp_ms: int) -> int:
    # Преобразуем миллисекунды в datetime
    date = datetime.fromtimestamp(timestamp_ms / 1000)
    day_of_month = date.day

    # День недели первого числа месяца (0 = понедельник, 6 = воскресенье)
    first_day = datetime(date.year, date.month, 1)
    # Преобразуем к формату: 0 = понедельник, ..., 6 = воскресенье
    start_day = (first_day.weekday())  # Monday=0, Sunday=6 в Python уже по нужному формату

    # Пересчёт как в TS-функции: сколько дней сдвиг + текущий день → неделя
    return (day_of_month + start_day - 1) // 7 + 1


def get_current_week_range():
    now = datetime.now()

    # Найти понедельник текущей недели
    start_of_week = now - timedelta(days=now.weekday())
    start_of_week = start_of_week.replace(hour=0, minute=0, second=0, microsecond=0)

    # Воскресенье этой недели
    end_of_week = start_of_week + timedelta(days=6)
    end_of_week = end_of_week.replace(hour=23, minute=59, second=0, microsecond=0)

    return start_of_week, end_of_week
