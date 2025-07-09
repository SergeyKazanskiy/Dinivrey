from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc, asc, or_, func, outerjoin
from typing import List
from datetime import datetime, timedelta
from database import get_session
from crud import CRUD
from roles.manager import schemas
import models
from helpers import get_week_range, get_current_week_range, get_week_number, get_month_range

router = APIRouter()


# Coaches
@router.get("/camps/{id}/coaches", response_model=List[schemas.CoachShortResponse], tags=["Manager"])
async def get_coaches(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Coach, session, filters={"camp_id": id}, order_by="first_name")

@router.get("/camps/coaches/{id}", response_model=schemas.CoachResponse, tags=["Manager"])
async def read_coach( id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Coach, id, session)

@router.get("/camps/coaches/{id}/groups", response_model=List[schemas.CoachGroupResponse], tags=["Manager"])
async def get_coache_groups( id: int, session: AsyncSession = Depends(get_session)):
    group = models.Group
    coachGroup = models.CoachGroup
    stmt = (
        select(coachGroup.id, coachGroup.group_id, group.name, group.description)
            .join(group, group.id == coachGroup.group_id)
            .where(coachGroup.coache_id == id)
            .order_by(asc(group.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [ schemas.CoachGroupResponse(
                id = row[0],
                group_id = row[1],
                name = row[2],
                desc = row[3]) for row in rows]

@router.get("/groups/free", response_model=List[schemas.FreeGroupResponse], tags=["Manager"])
async def get_groups_without_coach( session: AsyncSession = Depends(get_session)):
    Camp = models.Camp
    Group = models.Group
    CoachGroup = models.CoachGroup
    stmt = (
        select(Camp.name, Group.id, Group.name, Group.description)
            .select_from(
                outerjoin(Group, CoachGroup, Group.id == CoachGroup.group_id)
                .join(Camp, Camp.id == Group.camp_id)
            )
            .where(CoachGroup.group_id == None)
            .order_by(Camp.name, Group.name)
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [ schemas.FreeGroupResponse(
                camp_name = row[0],
                id = row[1],
                name = row[2],
                desc = row[3]) for row in rows]

# Groups
@router.get("/camps", response_model=List[schemas.CampResponse], tags=["Manager"])
async def get_camps(session: AsyncSession = Depends(get_session)):

    result = await session.execute(select(models.Camp))
    camps = result.scalars().all()

    camp_list = []

    for camp in camps:
        group_stmt = select(func.count()).where(models.Group.camp_id == camp.id)
        group_count = (await session.execute(group_stmt)).scalar_one()

        student_stmt = (
            select(func.count())
            .select_from(models.Student)
            .join(models.Group, models.Student.group_id == models.Group.id)
            .where(models.Group.camp_id == camp.id)
        )
        student_count = (await session.execute(student_stmt)).scalar_one()

        camp_list.append(schemas.CampResponse(
            id=camp.id,
            name=camp.name,
            groups=group_count,
            students=student_count
        ))
    return camp_list

@router.get("/camps/{id}/groups", response_model=List[schemas.GroupResponse], tags=["Manager"])
async def get_camp_groups(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Group, session, filters={"camp_id": id}, order_by="name")

@router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentShort], tags=["Manager"])
async def get_students(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": id}, order_by="first_name")

@router.get("/camps/{id}/events", response_model=List[schemas.EventResponse], tags=["Manager"])
async def get_camp_groups(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    month_start, month_end = get_month_range(year, month)
    
    start_ts = int(month_start.timestamp() * 1000)
    end_ts = int(month_end.timestamp() * 1000)
    event = models.Event

    result = await session.execute(
        select(event)
            .where(event.timestamp.between(start_ts, end_ts), event.camp_id == id )
            .order_by(asc(event.timestamp))
    )
    return result.scalars().all()
    
@router.get("/camps/groups/{id}/schedule", response_model=List[schemas.GroupScheduleResponse], tags=["Manager"])
async def get_group_schedule(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.GroupSchedule, session, filters={"group_id": id}, order_by="weekday")

@router.get("/camps/groups/{id}/coach", response_model=schemas.ResponseId, tags=["Manager"])
async def get_group_coach(id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(models.CoachGroup)
        .where(models.CoachGroup.group_id == id)
        .limit(1)
    )
    result = await session.execute(stmt)
    coachGroup = result.scalar_one_or_none()
    return {'id': coachGroup.coache_id} if coachGroup else {'id': 0}

# Events

@router.get("/coaches/short", response_model=List[schemas.CoachSchedualResponse], tags=["Manager"])
async def get_all_coaches_short(session: AsyncSession = Depends(get_session)):
    Coach = models.Coach
    Camp = models.Camp

    stmt = (
        select(Coach.id, Coach.first_name, Coach.last_name, Camp.name, Camp.id)
        .join(Camp, Camp.id == Coach.camp_id, isouter=True)  # LEFT JOIN
        .order_by(Camp.name, Coach.first_name)
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [ schemas.CoachSchedualResponse(
            id=row[0],
            first_name=row[1],
            last_name=row[2],
            camp_name=row[3],
            camp_id=row[4]
        )
        for row in rows ]



@router.get("/camps/{id}/schedule", tags=["Manager"])
async def get_camp_schedule( id: int, session: AsyncSession = Depends(get_session)):
    Camp = models.Camp
    Group = models.Group
    Coach = models.Coach
    GS = models.GroupSchedule

    stmt = (
        select( GS.id, GS.weekday, GS.hour, GS.minute, Group.id, Coach.first_name, Coach.last_name, Coach.camp_id, Camp.name)
            .join(GS, GS.group_id == Group.id)
            .join(Coach, Coach.id == GS.coach_id)
            .join(Camp, Camp.id == Group.camp_id )
            .where(Camp.id == id)
            .order_by(GS.weekday, GS.hour, GS.minute)
    )
    result = await session.execute(stmt)
    rows = result.all()
    schedule = []
    for row in rows:
        coach_name = f"{row[5]} {row[6]}"

        if row[7] != id:
            coach_name += f" ({row[8]})"

        schedule.append(
            schemas.CampScheduleResponse(
                id=row[0],
                weekday=row[1],
                hour=row[2],
                minute=row[3],
                group_id=row[4],
                coach_name=coach_name,
            )
        )
    return schedule

    # schedule = await session.execute(
    #     select(models.GroupSchedule)
    #         .join(models.Group, models.Group.id == models.GroupSchedule.group_id)
    #         .where(models.Group.camp_id == id)
    #         .order_by(asc(models.GroupSchedule.weekday),
    #                   asc(models.GroupSchedule.hour),
    #                   asc(models.GroupSchedule.minute))
    # )
    # return schedule.scalars().all()

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

# Student
@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Manager"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/students/{id}/parents", response_model=List[schemas.ParentResponse], tags=["Manager"])
async def get_student_parents(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Parent, session, filters={"student_id": id})

@router.get("/students/{id}/coach/comments", response_model=List[schemas.CommentResponse], tags=["Manager"])
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

@router.get("/students/{id}/tests/last", response_model=List[schemas.TestResponse], tags=["Manager"])
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
@router.get("/students/{id}/tests/last/date", tags=["Manager"])
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

@router.get("/students/{id}/games/last/date", tags=["Manager"])
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

@router.get("/students/{id}/tests", response_model=List[schemas.TestResponse], tags=["Manager"])
async def get_student_tests(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Test).where(models.Test.timestamp.between(start_ts, end_ts), models.Test.student_id == id)
    )
    return result.scalars().all()

@router.get("/students/{id}/games", response_model=List[schemas.GameResponse], tags=["Manager"])
async def get_student_games(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Game).where(models.Game.timestamp.between(start_ts, end_ts), models.Game.student_id == id)
    )
    return result.scalars().all()


# Achievements
@router.get("/students/{id}/achievements", response_model=List[schemas.AchieveResponse], tags=["Manager"])
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

@router.get("/achieves", response_model=List[schemas.AchievementResponse], tags=["Manager"])
async def get_achieves(category: str, trigger: str, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session, filters={"trigger": trigger, "category": category})


@router.get("/camps/groups/{id}/achievements", tags=["Manager"])
async def get_group_achieves(id: int, session: AsyncSession = Depends(get_session)):
    Achieve = models.Achieve
    StudentAchieve = models.Achievement
    Student=models.Student

    stmt = (
        select(Achieve.id, Achieve.image, Achieve.name, Achieve.category,
               func.count(StudentAchieve.student_id).label("count"))
        .join(StudentAchieve, StudentAchieve.achieve_id == Achieve.id)
        .join(Student, Student.id == StudentAchieve.student_id)
        .where(Student.group_id == id)
        .group_by(Achieve.id, Achieve.image, Achieve.name)
        .order_by(Achieve.category, Achieve.name)
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [{"id": row[0],
            "image": row[1],
            "name": row[2],
            "category": row[3],
            "count": row[4]}
            for row in rows]

@router.get("/camps/groups/{id}/statistics", response_model=List[schemas.GroupTestResponse], tags=["Manager"])
async def get_group_statistics(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1

    Test = models.Test
    Student=models.Student

    stmt = (
        select(
            Test.timestamp,
            func.avg(Test.speed).label("avg_speed"),
            func.avg(Test.stamina).label("avg_stamina"),
            func.avg(Test.climbing).label("avg_climbing"),
            func.avg(Test.evasion).label("avg_evasion"),
            func.avg(Test.hiding).label("avg_hiding"),
        )
        .join(Student, Student.id == Test.student_id)
        .where(Student.group_id == id, Test.timestamp.between(start_ts, end_ts))
        .group_by(Test.timestamp)
        .order_by(Test.timestamp)
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [{"timestamp": row[0],
            "speed": row[1],
            "stamina": row[2],
            "climbing": row[3],
            "evasion": row[4],
            "hiding": row[5]}
            for row in rows]

