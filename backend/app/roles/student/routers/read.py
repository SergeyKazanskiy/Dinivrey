from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Optional
from database import get_session
from crud import CRUD
from roles.student import schemas
import models
from sqlalchemy.future import select
from sqlalchemy import desc, asc, or_, exists, func
from datetime import datetime, timedelta
from services.NotificationService import NotificationService

router = APIRouter()


# Profile
@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Student"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/camps/groups/{group_id}", response_model=schemas.GroupResponse, tags=["Student"])
async def get_student_group(group_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Group, group_id, session)

@router.get("/students/{id}/achievements/first", response_model=List[schemas.AchievementResponse], tags=["Student"])
async def get_student_first_achieve(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(S.id, A.image, A.name, S.level, A.effect)
        .join(A, S.achieve_id == A.id )
        .where( S.student_id == id, S.in_profile == True )
        .order_by(S.profile_place)
        .limit(1)
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

@router.get("/camps/groups/{group_id}/events/upcoming", tags=["Student"])
async def get_next_events(group_id: int, group_extra_id: int, session: AsyncSession = Depends(get_session)):
    Event = models.Event
    Schedule = models.GroupSchedule

    # 1. Получаем текущее время
    now = datetime.now()
    now_timestamp = int(now.timestamp() * 1000)

    # 2. Находим ближайшее запланированное событие
    stmt1 = (
        select(Event)
        .where(
            or_(
                Event.group1_id == group_id,
                Event.group2_id == group_id
            ),
            Event.timestamp >= now_timestamp
        )
        .order_by(asc(Event.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt1)
    event: Optional[models.Event] = result.scalars().first()

    # 3. Достаем расписание для группы и экстра-группы
    stmt2 = (
        select(Schedule)
        .where(
            or_(
                Schedule.group_id == group_id,
                Schedule.group_id == group_extra_id
            ),
        )
        .order_by(Schedule.weekday, Schedule.hour, Schedule.minute)
    )
    result = await session.execute(stmt2)
    schedules = result.scalars().all()

    # 4. Преобразуем расписание в события текущей и следующей недели
    now_weekday = now.isoweekday()  # 1 = понедельник, 7 = воскресенье
    schedule_events = []

    for sch in schedules:
        # timestamp для события в текущей неделе
        event_date = now + timedelta(days=(sch.weekday - now_weekday))
        event_date = event_date.replace(
            hour=sch.hour,
            minute=sch.minute,
            second=0,
            microsecond=0
        )

        # если время уже прошло, переносим на следующую неделю
        if event_date < now:
            event_date += timedelta(days=7)

        timestamp = int(event_date.timestamp() * 1000)
        schedule_events.append({
            "timestamp": timestamp,
            "duration": 60  # по условию расписание всегда = 1 час
        })

    # 5. Берем ближайшее расписание
    schedule_event = None
    if schedule_events:
        schedule_event = min(schedule_events, key=lambda e: e["timestamp"])

    # 6. Сравниваем с Event
    candidates = []

    if event:
        candidates.append({
            "timestamp": event.timestamp,
            "duration": event.duration
        })

    if schedule_event:
        candidates.append(schedule_event)

    if not candidates:
        return []

    result_event = min(candidates, key=lambda e: e["timestamp"])
    return [result_event]


@router.get("/camps/groups/{group_id}/events/upcoming2", response_model=List[schemas.EventResponse], tags=["Student"])
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


# Notifications
@router.get("/students/{id}/notifications/count", response_model=List[str], tags=["Student"])
async def get_notifications_count(id: int, session: AsyncSession = Depends(get_session)):
    return await NotificationService.get_notifications_count(id, session)

@router.get("/students/{id}/notifications", response_model=List[str], tags=["Student"])
async def get_notifications(id: int, session: AsyncSession = Depends(get_session)):
    return await NotificationService.get_notifications(id, session)


# Statistics (tests)
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

@router.get("/students/{id}/tests", response_model=List[schemas.TestResponse], tags=["Student"])
async def get_student_tests(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Test)
        .where(models.Test.timestamp.between(start_ts, end_ts), models.Test.student_id == id)
        .order_by(models.Test.timestamp)
    )
    return result.scalars().all()

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

@router.get("/students/{id}/tests/limit", response_model=List[schemas.TestResponse], tags=["Student"])
async def get_last_tests_limit(id: int, limit: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.Test)
        .where(models.Test.student_id == id)
        .order_by(models.Test.timestamp)
        .limit(limit)
    )
    result = await session.execute(stmt)
    return result.scalars().all()

# Statistics (games)
@router.get("/students/{id}/games/last/date", tags=["Student"])
async def get_last_game_date(id: int, session: AsyncSession = Depends(get_session)):
    Gamer = models.Gamer
    Game = models.Game

    stmt = (
        select(Game)
        .join(Gamer, Gamer.game_id == Game.id )
        .where( Gamer.student_id == id)
        .order_by(desc(Game.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt)
    event = result.scalar_one_or_none()
    
    isEvents = True if event else False
    timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)
    return {"year": date.year, "month": date.month, "isEvents": isEvents}

@router.get("/students/{id}/games", response_model=List[schemas.StudentGame], tags=["Student"])
async def get_student_games(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1

    Gamer = models.Gamer
    Game = models.Game

    stmt = (
        select(Game.id, Game.timestamp, Gamer.team, Gamer.caught, Gamer.freeded, Gamer.is_survived)
        .join(Gamer, Gamer.game_id == Game.id )
        .where( Gamer.student_id == id, Game.timestamp.between(start_ts, end_ts))
        .order_by(Game.timestamp)
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [ schemas.StudentGame(
                game_id = row[0],
                timestamp = row[1],
                team = row[2],
                caught = row[3],
                freeded = row[4],
                is_survived = row[5]
            ) for row in rows]


@router.get("/students/{id}/games/last", response_model=List[schemas.StudentGame], tags=["Student"])
async def get_last_game(id: int, session: AsyncSession = Depends(get_session)):
    Gamer = models.Gamer
    Game = models.Game

    stmt = (
        select(Game.id, Game.timestamp, Gamer.team, Gamer.caught, Gamer.freeded, Gamer.is_survived)
        .join(Gamer, Gamer.game_id == Game.id )
        .where( Gamer.student_id == id)
        .order_by(desc(Game.timestamp))
        .limit(1)
    )
    result = await session.execute(stmt)
    row = result.one_or_none()

    return [schemas.StudentGame(
                game_id = row[0],
                timestamp = row[1],
                team = row[2],
                caught = row[3],
                freeded = row[4],
                is_survived = row[5]
            )] if row else []


# Game-reports
@router.get("/students/{id}/game-reports", tags=["Student"])
async def get_student_game_reports(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1

    Game = models.Game
    Event = models.Event
    Gamer = models.Gamer

    stmt = (
        select(Game, Gamer.team, Gamer.is_survived)
        .join(Gamer, Game.id == Gamer.game_id)
        .join(Event, Game.event_id == Event.id)
        .where(
            Gamer.student_id == id,
            Game.timestamp.between(start_ts, end_ts)
        )
        .order_by(models.Game.timestamp)
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [{ "game": game, "team": team, "is_survived": is_survived }
        for game, team, is_survived in rows]

@router.get("/students/game-reports/{id}", response_model=schemas.GameResponse, tags=["Student"])
async def get_event_game(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Game, id, session)

@router.get("/camps/events/games/{game_id}/gamers", response_model=List[schemas.GamerResponse], tags=["Student"])
async def get_game_players(game_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Gamer, session, filters={"game_id": game_id})

@router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentResponse], tags=["Student"])
async def get_students(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": id}, order_by="first_name")


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

@router.get("/camps/groups/{group_id}/events",  response_model=List[schemas.CompetitionResponse], tags=["Student"])
async def get_group_events(year: int, month: int, group_id: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1

    result = await session.execute(
        select(models.Event)
        .where(models.Event.timestamp.between(start_ts, end_ts), models.Event.type == 'Game',
               or_(
                    models.Event.group1_id == group_id,
                    models.Event.group2_id == group_id
                ))
        .order_by(asc(models.Event.timestamp))
    )
    events = result.scalars().all()
    competitions = []

    for event in events:
        group1 = await CRUD.read(models.Group, event.group1_id, session)
        group2 = await CRUD.read(models.Group, event.group2_id, session)

        competition = schemas.CompetitionResponse(
            id = event.id,
            timestamp = event.timestamp,
            desc = event.desc or '',
            group1 = group1.name,
            group2 = group2.name,
            duration = event.duration
        )
        competitions.append(competition)

    return competitions

@router.get("/camps/groups/{id}/schedule", response_model=List[schemas.GroupScheduleResponse], tags=["Student"])
async def get_group_schedule(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.GroupSchedule, session, filters={"group_id": id}, order_by="weekday")


# Achievements
@router.get("/students/{id}/achievements", response_model=List[schemas.AchieveResponse], tags=["Student"])
async def get_student_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(S.id, A.image, A.name, S.in_profile, A.category, S.level, A.effect, S.profile_place)
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
                profile_place = row[7],
            ) for row in rows]

@router.get("/students/{id}/achievements/locked", response_model=List[schemas.AchieveResponse], tags=["Student"])
async def get_locked_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement

    subquery = (
        select(S.id)
        .where((S.student_id == id) & (S.achieve_id == A.id))
    )

    stmt = (
        select(A.id, A.image, A.name, A.category, A.effect)
        .where(~exists(subquery))
        .order_by(asc(A.name))
    )

    result = await session.execute(stmt)
    rows = result.all()

    return [ schemas.AchieveResponse(
                id = row[0],
                image = row[1],
                name = row[2],
                category = row[3],
                effect = row[4],
                in_profile = None,
                profile_place = 0,
                level = None,
            ) for row in rows]

# Liders
@router.get("/camps", response_model=List[schemas.CampResponse], tags=["Student"])
async def get_camps(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Camp, session)

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
                'avatar': student.avatar,
                'first_name': student.first_name,
                'last_name': student.last_name,
                'gender': student.gender,
                'age': student.age,
                'events_attended': student.events_attended,
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
        .order_by(S.profile_place)
        .limit(1)
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"name": row[0], "image": row[1], "level": row[2]} for row in rows]

@router.get("/students/{student_id}/attendances/count", response_model=Dict[str, int], tags=["Student"])
async def get_student_attendance_count( student_id: int, session: AsyncSession = Depends(get_session)):
    value = await session.scalar(
        select(func.count())
        .select_from(models.Attendance)
        .where(
            models.Attendance.student_id == student_id,
            models.Attendance.present.is_(True),
        )
    )
    return {"count" : value or 0}
