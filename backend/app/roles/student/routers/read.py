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


@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Student"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/students/{id}/achievements/profile", response_model=List[schemas.AchievementResponse], tags=["Student"])
async def get_student_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(A.image, A.name, S.level, A.effect)
        .join(A, S.achieve_id == A.id )
        .where( S.student_id == id, S.in_profile == True )
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [ schemas.AchievementResponse(
                image = row[0],
                name = row[1],
                level = row[2],
                effect = row[3]
            ) for row in rows]

@router.get("/students/{id}/tests/last", response_model=schemas.TestResponse or {}, tags=["Student"])
async def get_last_test(id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.Test)
        .where(models.Test.student_id == id)
        .order_by(desc(models.Test.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt)
    test = result.scalar_one_or_none()
    return test or {}

@router.get("/students/{id}/games/last", response_model=schemas.GameResponse or {}, tags=["Student"])
async def get_last_game(id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.Game)
        .where(models.Game.student_id == id)
        .order_by(desc(models.Game.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt)
    test = result.scalar_one_or_none()
    return test or {}

@router.get("/students/{id}/tests", response_model=List[schemas.TestResponse], tags=["Student"])
async def get_student_tests(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Test).where(models.Test.timestamp.between(start_ts, end_ts), models.Test.student_id == id)
    )
    return result.scalars().all()

@router.get("/students/{id}/games", response_model=List[schemas.GameResponse], tags=["Student"])
async def get_student_games(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Game).where(models.Game.timestamp.between(start_ts, end_ts), models.Game.student_id == id)
    )
    return result.scalars().all()

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

    # 5. Формируем ответ
    return [
        {
            "id": event.id,
            "timestamp": event.timestamp,
            "name": event.name  # если у модели Event есть поле name
        }
        for event in selected_events
    ]

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

@router.get("/students/{id}/achievements", response_model=List[schemas.AchieveResponse], tags=["Student"])
async def get_student_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(S.id, A.image, A.name, S.in_profile, A.category, S.level)
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
                level = row[5]
            ) for row in rows]


@router.get("/camps/{id}/groups", response_model=List[schemas.GroupResponse], tags=["Student"])
async def get_camp_groups(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Group, session, filters={"camp_id": id}, order_by="name")

@router.get("/camps/groups/{id}/liders", tags=["Student"])
async def get_liders(id: int, session: AsyncSession = Depends(get_session)):
    students = await CRUD.get(models.Student, session, filters={"group_id": id}, order_by="first_name")
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
                'phone': student.phone or '',
                'speed': test.speed,
                'stamina': test.stamina,
                'climbing': test.climbing,
                'evasion': test.evasion,
                'hiding': test.hiding,  
                'achieves': await getAchievements(id, session)
            }
            liders.append(lider)
    return liders

async def getAchievements(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(A.name, A.image, S.level)
        .join(A, S.achieve_id == A.id )
        .where(
            S.student_id == id,
            S.in_profile == True
        )
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"name": row[0], "image": row[1], "level": row[2]} for row in rows]

