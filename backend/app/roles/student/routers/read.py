from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import get_session
from crud import CRUD
from roles.student import schemas
import models
from sqlalchemy.future import select
from sqlalchemy import desc, asc, or_
from datetime import datetime

router = APIRouter()


# Profile
@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Student"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/students/{id}/achievements/profile", response_model=List[schemas.AchievementResponse], tags=["Student"])
async def get_student_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(S.id, A.image, A.name, S.level, A.effect)
        .join(A, S.achieve_id == A.id )
        .where( S.student_id == id, S.in_profile == True )
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [ schemas.AchievementResponse(
                id = row[0],
                image = row[1],
                name = row[2],
                level = row[3],
                effect = row[4]
            ) for row in rows]

@router.get("/camps/groups/{group_id}/events/upcoming", response_model=List[schemas.EventResponse], tags=["Student"])
async def get_next_events(group_id: int, session: AsyncSession = Depends(get_session)):
    now = datetime.now()
    now_timestamp = int(now.timestamp() * 1000)  # текущее время в миллисекундах

    # 1. Находим все события после текущего времени, отсортированные по времени
    stmt = (
        select(models.Event)
        .where(
            or_(
                models.Event.group1_id == group_id,
                models.Event.group2_id == group_id
            ),
            models.Event.timestamp >= now_timestamp
        )
        .order_by(asc(models.Event.timestamp))
    )
    result = await session.execute(stmt)
    events = result.scalars().all()

    if not events:
        return []

    # 2. Группируем события по дате (год, месяц, день)
    events_by_date = {}
    for event in events:
        event_dt = datetime.fromtimestamp(event.timestamp / 1000)
        date_key = (event_dt.year, event_dt.month, event_dt.day)
        events_by_date.setdefault(date_key, []).append(event)

    # 3. Ищем события за сегодня
    today_key = (now.year, now.month, now.day)
    if today_key in events_by_date:
        selected_events = events_by_date[today_key]
    else:
        # 4. Если за сегодня нет — берем события следующего ближайшего дня
        sorted_keys = sorted(events_by_date.keys())
        selected_events = events_by_date[sorted_keys[0]]
    return selected_events


# Statistics
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

@router.get("/students/{id}/games/last", response_model=List[schemas.GameResponse], tags=["Student"])
async def get_last_game(id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.Game)
        .where(models.Game.student_id == id)
        .order_by(desc(models.Game.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt)
    event = result.scalar_one_or_none()
    return [event] if event else []


@router.get("/students/{id}/tests/last/date", tags=["Student"])
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

@router.get("/students/{id}/games/last/date", tags=["Student"])
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

@router.get("/students/{id}/tests", response_model=List[schemas.TestResponse], tags=["Student"])
async def get_student_tests(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Test).where(models.Test.timestamp.between(start_ts, end_ts), models.Test.student_id == id)
    )
    return result.scalars().all()

@router.get("/students/{id}/games", response_model=List[schemas.GameResponse], tags=["Student"]) #???
async def get_student_games(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Game).where(models.Game.timestamp.between(start_ts, end_ts), models.Game.student_id == id)
    )
    return result.scalars().all()

# Game-reports
@router.get("/students/{id}/game-reports", response_model=List[schemas.GameResponse], tags=["Student"])
async def get_student_game_reports(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1

    Student = models.Student
    Group = models.Group
    Game = models.Game
    Event = models.Event

    stmt = (
        select(Game)
        .join(Event, Game.event_id == Event.id)
        .join(Group, or_(
            Event.group1_id == Group.id,
            Event.group2_id == Group.id
        ))
        .join(Student, Student.group_id == Group.id)
        .where(
            Student.id == id,
            Game.timestamp.between(start_ts, end_ts)
        )
        .order_by(models.Game.timestamp)
    )
    result = await session.execute(stmt)
    return result.scalars().all()

@router.get("/camps/events/games/{id}", response_model=schemas.GameResponse, tags=["Student"])
async def get_event_game(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Game, id, session)

@router.get("/camps/events/games/{game_id}/gamers", response_model=List[schemas.GamerResponse], tags=["Student"])
async def get_game_players(game_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Gamer, session, filters={"game_id": game_id})

# Events
@router.get("/camps/groups/{group_id}/events/latest", tags=["Student"])
async def get_latest_event(group_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.Event)
                                   .where(or_(
                                            models.Event.group1_id == group_id,
                                            models.Event.group2_id == group_id
                                        ))
                                   .order_by(desc(models.Event.timestamp))
                                   .limit(1))
    event = result.scalar_one_or_none()  # Вызываем ОДИН раз
    isEvents = True if event else False
    timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)
    return {"year": date.year, "month": date.month, "isEvents": isEvents}

@router.get("/camps/groups/{group_id}/events",  response_model=List[schemas.EventResponse], tags=["Student"])
async def get_events(year: int, month: int, group_id: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Event)
        .where(models.Event.timestamp.between(start_ts, end_ts),
               or_(
                    models.Event.group1_id == group_id,
                    models.Event.group2_id == group_id
                ))
        .order_by(asc(models.Event.timestamp))
    )
    return result.scalars().all()

@router.get("/students/{id}/achievements", response_model=List[schemas.AchieveResponse], tags=["Student"])
async def get_student_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(S.id, A.image, A.name, S.in_profile, A.category, S.level, A.effect)
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
                effect = row[6]
            ) for row in rows]


@router.get("/camps/{id}/groups", response_model=List[schemas.GroupResponse], tags=["Student"])
async def get_camp_groups(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Group, session, filters={"camp_id": id}, order_by="name")

@router.get("/camps/groups/{group_id}/liders", tags=["Student"])
async def get_liders(group_id: int, session: AsyncSession = Depends(get_session)):
    students = await CRUD.get(models.Student, session, filters={"group_id": group_id}, order_by="first_name")
    liders = []
    for student in students:
        tests = await session.execute(select(models.Test).where(models.Test.student_id == student.id).order_by(desc(models.Test.timestamp)).limit(1))
        test = tests.scalar_one_or_none()
        if test:
            lider = {
                'id': student.id,
                'photo': student.photo,
                'first_name': student.first_name,
                'last_name': student.last_name,
                'gender': student.gender,
                'age': student.age,
                'speed': test.speed,
                'stamina': test.stamina,
                'climbing': test.climbing,
                'evasion': test.evasion,
                'hiding': test.hiding,  
                'achieves': await getAchievements(student.id, session)
            }
            liders.append(lider)
    return liders

async def getAchievements(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(A.name, A.image, S.level)
        .join(A, S.achieve_id == A.id )
        .where(S.student_id == id, S.in_profile == True)
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"name": row[0], "image": row[1], "level": row[2]} for row in rows]

