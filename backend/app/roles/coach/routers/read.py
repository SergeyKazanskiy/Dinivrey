from fastapi import APIRouter, Query, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import get_session
from crud import CRUD
from roles.coach import schemas
import models
from datetime import datetime, timedelta
from sqlalchemy.future import select
from sqlalchemy import desc, asc, or_, func, cast, Float

from helpers import get_week_range, get_current_week_range, get_week_number, get_month_range

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


@router.get("/camps/groups/{id}/students", tags=["Coach"]) #response_model=List[schemas.StudentAvgScore], 
async def get_students(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": id}, order_by="first_name")

@router.get("/groups/{group_id}/students", response_model=List[schemas.StudentAvgScore], tags=["Coach"])
async def get_students_with_test_avg( group_id: int, session: AsyncSession = Depends(get_session)):
    Test = models.Test
    Student = models.Student

    last_test_with_avg = (
        select(
            Test.student_id,
            (
                (Test.speed + Test.stamina + Test.climbing + Test.evasion + Test.hiding) / 5
            ).label("test_avg"),
            func.row_number().over(
                partition_by=Test.student_id,
                order_by=Test.timestamp.desc()
            ).label("rn")
        ).subquery()
    )
    stmt = (
        select( Student.id, Student.photo, Student.first_name, Student.last_name, Student.gender, Student.age, Student.active,
            last_test_with_avg.c.test_avg
        )
        .join(
            last_test_with_avg,
            last_test_with_avg.c.student_id == Student.id,
            isouter=True
        )
        .where(Student.group_id == group_id)
        .where(last_test_with_avg.c.rn == 1)
        .order_by(Student.first_name)
    )

    result = await session.execute(stmt)
    rows = result.all()

    return [{ "id": row[0], "photo": row[1], "first_name": row[2], "last_name": row[3], "gender": row[4], "age": row[5],
            "active": row[6], "test_avg": row[7]
        } for row in rows ]


# Student
@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Coach"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)


@router.get("/students/{id}/parents", response_model=List[schemas.ParentResponse], tags=["Coach"])
async def get_student_parents(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Parent, session, filters={"student_id": id})

@router.get("/students/{id}/coach/comments", response_model=List[schemas.CommentResponse], tags=["Coach"])
async def get_student_coach_comments(id: int, session: AsyncSession = Depends(get_session)):
    Event = models.Event
    Attendance = models.Attendance
    stmt = (
        select(Event.timestamp, Attendance.comment)
            .join(Attendance, Attendance.event_id == Event.id)
            .where(Attendance.student_id == id, Attendance.comment.isnot(None), Attendance.comment != "")
            .order_by(desc(Event.timestamp))
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

# @router.get("/students/{id}/games/last/date", tags=["Coach"])
# async def get_last_game_date(id: int, session: AsyncSession = Depends(get_session)):
#     stmt = (
#         select(models.Game)
#             .where(models.Game.student_id == id)
#             .order_by(desc(models.Game.timestamp))
#             .limit(1)
#     )
#     result = await session.execute(stmt)
#     event = result.scalar_one_or_none()
#     isEvents = True if event else False
#     timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
#     date = datetime.fromtimestamp(timestamp / 1000)
#     return {"year": date.year, "month": date.month, "isEvents": isEvents}

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

@router.get("/students/{id}/tests", response_model=List[schemas.TestResponse], tags=["Coach"])
async def get_student_tests(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Test).where(models.Test.timestamp.between(start_ts, end_ts), models.Test.student_id == id)
    )
    return result.scalars().all()

# @router.get("/students/{id}/games", response_model=List[schemas.GameResponse], tags=["Coach"])
# async def get_student_games(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
#     start_ts = int(datetime(year, month, 1).timestamp() * 1000)
#     end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
#     result = await session.execute(
#         select(models.Game).where(models.Game.timestamp.between(start_ts, end_ts), models.Game.student_id == id)
#     )
#     return result.scalars().all()

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
async def get_achieves(category: str, trigger: str, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session, filters={"trigger": trigger, "category": category})

# Attendance
@router.get("/students/{student_id}/attendances/percent", response_model=schemas.AttendancePercent, tags=["Coach"])
async def get_student_attendance_percent( student_id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(
            models.Event.type,
            func.round(
                (func.sum(cast(models.Attendance.present, Float)) / func.count() * 100), 0
            ).label("attendance_percent")
        )
        .join(models.Event, models.Event.id == models.Attendance.event_id)
        .where(models.Attendance.student_id == student_id)
        .group_by(models.Event.type)
    )

    result = await session.execute(stmt)
    rows = result.all()

    attendance_stats = {t: 0 for t in ["Training", "Exam", "Game"]}
    attendance_stats.update({row.type: int(row.attendance_percent) for row in rows})

    return attendance_stats

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

@router.get("/camps/groups/{group_id}/events",  response_model=List[schemas.GroupEventsResponse], tags=["Coach"])
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
    rows = result.all()
    response = []
    for row in rows:
        desc = row[3] if row[2] == "Game" else await getEventDrills(row[0], session)
        amount = await getParticipantsAmount(row[0], group_id, session)

        response.append(schemas.GroupEventsResponse(
            id=row[0],
            timestamp=row[1],
            type=row[2],
            desc=desc,
            amound=amount
        ))
    return response

async def getEventDrills(event_id: int, session: AsyncSession) -> str:
    drill = models.Drill
    eventDrill = models.EventDrill

    stmt = (
        select(drill.name)
        .join(eventDrill, eventDrill.drill_id == drill.id)
        .where(eventDrill.event_id == event_id, eventDrill.completed == True)
        .order_by(asc(drill.name))
    )

    result = await session.execute(stmt)
    rows = result.scalars().all()

    return ", ".join(rows)

async def getParticipantsAmount(event_id: int, group_id: int, session: AsyncSession) -> int:
    attendance = models.Attendance  # Предположим, что у тебя есть models.Attendance

    stmt = (
        select(func.count())
        .where(attendance.event_id == event_id, attendance.group_id == group_id, attendance.present == True)
    )

    result = await session.execute(stmt)
    count = result.scalar_one()  # Получаем одно значение (int)

    return count


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
@router.get("/camps/events/{event_id}/is-report", response_model=schemas.EventReportResponse, tags=["Coach"])
async def get_is_report_sent(event_id: int, group_number: int, session: AsyncSession = Depends(get_session)):
    if group_number not in {1, 2}:
        raise HTTPException(status_code=400, detail="Invalid group number")
    field_name = f"group{group_number}_report"

    stmt = (
        select(getattr(models.Event, field_name ))
        .where(models.Event.id == event_id)
    )
    result = await session.execute(stmt)
    return {"is_report": result.scalar()}



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
async def get_testers(event_id: int, group_id: int, timestamp: int, session: AsyncSession = Depends(get_session)):
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
                .where(
                    models.Test.student_id == row[1],
                      # models.Test.timestamp == row[5]
                      )
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

                'speed_time': test.speed_time,
                'stamina_time': test.stamina_time,
                'climbing_time': test.climbing_time,
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

# Games
@router.get("/camps/events/{event_id}/groups/{group_id}/games", response_model=List[schemas.GameResponse], tags=["Coach"])
async def get_event_games(event_id: int, group_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Game, session, filters={"event_id": event_id, "group_id": group_id}, order_by="timestamp")

@router.get("/camps/events/games/{id}", response_model=schemas.GameResponse, tags=["Coach"])
async def get_event_game(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Game, id, session)

@router.get("/camps/events/games/{game_id}/gamers", response_model=List[schemas.GamerResponse], tags=["Coach"])
async def get_game_players(game_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Gamer, session, filters={"game_id": game_id})