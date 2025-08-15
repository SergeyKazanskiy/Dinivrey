from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import get_session
from crud import CRUD
from roles.admin import schemas
import models
from sqlalchemy.future import select
from sqlalchemy import desc, asc, outerjoin, func, cast, Float
from datetime import datetime
from sqlalchemy.orm import selectinload
import helpers
from collections import defaultdict


router = APIRouter()
WEEKDAYS = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday" }


# Students
@router.get("/camps", response_model=List[schemas.CampResponse], tags=["Admin_select"])
async def get_camps(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Camp, session)

@router.get("/camps/{id}", response_model=schemas.CampResponse, tags=["Admin_select"])
async def get_camp(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Camp, id, session)

@router.get("/camps/{id}/groups", response_model=List[schemas.GroupResponse], tags=["Admin_select"])
async def get_camp_groups(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Group, session, filters={"camp_id": id}, order_by="name")

@router.get("/camps/groups/{id}/schedule", response_model=List[schemas.GroupScheduleRead], tags=["Admin_select"])
async def get_camp_groups(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.GroupSchedule, session, filters={"group_id": id}, order_by="weekday")

@router.get("/camps/{id}/groups/schedule", response_model=List[schemas.GroupResponse], tags=["Admin_select"])
async def get_groups_with_schedule(id: int, session: AsyncSession = Depends(get_session)):
    groups = await CRUD.get(models.Group, session, filters={"camp_id": id}, order_by="name")
    for group in groups:
        schedule = await CRUD.get(models.GroupSchedule, session, filters={"group_id": group.id}, order_by="weekday")
        times = [
            f"{WEEKDAYS[entry.weekday]} {entry.hour:02}:{entry.minute:02}"
            for entry in schedule
        ]
        group.description = f"{', '.join(times)}"
    return groups

@router.get("/camps/groups/{id}/students", response_model=List[schemas.StudentShort], tags=["Admin_select"])
async def get_students(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": id}, order_by="first_name")

@router.get("/camps/groups/students/all", response_model=List[schemas.StudentShort], tags=["Admin_select"])
async def get_all_students(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, order_by="first_name")

# Events
@router.get("/camps/events/all", response_model=List[schemas.EventResponse], tags=["Admin_select"])
async def get_all_events(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Event, session)

@router.get("/camps/{camp_id}/events/latest", tags=["Admin_select"])
async def get_latest_event(camp_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.Event).where(models.Event.camp_id == camp_id).order_by(desc(models.Event.timestamp)).limit(1))
    event = result.scalar_one_or_none()  # Вызываем ОДИН раз
    isEvents = True if event else False
    timestamp = event.timestamp if event else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)
    return {"year": date.year, "month": date.month, "isEvents": isEvents}

@router.get("/camps/{camp_id}/events", tags=["Admin_select"])
async def get_events(year: int, month: int, camp_id: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Event)
        .where(models.Event.timestamp.between(start_ts, end_ts), models.Event.camp_id == camp_id)
        .order_by(asc(models.Event.timestamp))
    )
    return result.scalars().all()

@router.get("/camps/events/attendances", tags=["Admin_select"]) #
async def get_all_attendances(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Attendance, session)

@router.get("/camps/events/{event_id}/groups/{group_id}/attendances", tags=["Admin_select"])
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


@router.get("/camps/groups/{group_id}/students/names", response_model=List[schemas.StudentName], tags=["Admin_select"]) #
async def get_student_names(group_id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Student, session, filters={"group_id": group_id}, order_by="first_name")

# Coaches
@router.get("/camps/{id}/coaches", response_model=List[schemas.CoachResponse], tags=["Admin_select"])
async def get_camp_coaches(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Coach, session, filters={"camp_id": id}, order_by="first_name")

# Managers
@router.get("/camps/{id}/managers", response_model=List[schemas.ManagerResponse], tags=["Admin_select"])
async def get_camp_managers(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Manager, session, filters={"camp_id": id}, order_by="first_name")

@router.get("/camps/{id}/coaches/groups", response_model=List[schemas.CoachGroup], tags=["Admin_select"])
async def get_coache_groups( id: int, session: AsyncSession = Depends(get_session)):
    group = models.Group
    CG = models.CoachGroup
    stmt = (
        select(CG.id, CG.coache_id, CG.group_id, group.name, group.description)
            .join(group, group.id == CG.group_id)
            .where(group.camp_id == id)
            .order_by(asc(group.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [ schemas.CoachGroup(
                id = row[0],
                coache_id = row[1],
                group_id = row[2],
                name = row[3],
                desc = row[4]) for row in rows]

@router.get("/groups/free", response_model=List[schemas.FreeGroupResponse], tags=["Admin_select"])
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

@router.get("/camps/{id}/coaches/schedules", tags=["Admin_select"])
async def get_camp_schedule( id: int, session: AsyncSession = Depends(get_session)):
    Group = models.Group
    Coach = models.Coach
    GS = models.GroupSchedule

    stmt = (
        select( Coach.id, GS.weekday, GS.hour, GS.minute, Group.name)
            .join(GS, GS.group_id == Group.id)
            .join(Coach, Coach.id == GS.coach_id)
            .where(Group.camp_id == id)
            .order_by(GS.coach_id, GS.weekday, GS.hour, GS.minute)
    )
    result = await session.execute(stmt)
    rows = result.all()

    prev_coach_id = 0
    prev_day = 0
    schedules = []

    for row in rows:
        schedules.append(
            schemas.CoachSchedule(
                coach_id=row[0],
                weekday=WEEKDAYS[row[1]], #if row[0] != prev_coach_id and row[1] != prev_day else '',
                time=f"{row[2]}:{row[3]}",
                group=row[4]
            )
        )
        prev_coach_id = row[0]
        prev_day = row[1]
    return schedules

@router.get("/camps/{camp_id}/competitions", tags=["Admin_select"])
async def get_events(year: int, month: int, camp_id: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1

    Event = models.Event
    
    stmt = (
        select(Event.timestamp, Event.desc, Event.group1_id, Event.group2_id)
        .where(Event.timestamp.between(start_ts, end_ts), Event.camp_id == camp_id, Event.type == 'Game')
        .order_by(asc(models.Event.timestamp))
    )
    result = await session.execute(stmt)
    rows = result.all()
    events = []

    for row in rows:
        group1 = await CRUD.read(models.Group, row[2], session)
        group2 = await CRUD.read(models.Group, row[3], session)
        dateTime = helpers.format_date_time(row[0])

        events.append(
            schemas.CoachEvent(
                date=dateTime['date'],
                time=dateTime['time'],
                desc=row[1],
                group1_id=row[2],
                group2_id=row[3],
                group1=group1.name,
                group2=group2.name
            )
        )
    return events


# Achieves
@router.get("/achieves/all", response_model=List[schemas.AchieveResponse], tags=["Admin_select"])
async def get_achieves(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session)

@router.get("/achieves", response_model=List[schemas.AchieveResponse], tags=["Admin_select"])
async def get_achieves(category: str, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session, filters={"category": category})

@router.get("/achieves/{id}", response_model=schemas.AchieveResponse, tags=["Admin_select"])
async def get_achieve(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Achieve, id, session)

@router.get("/achieves/{id}/rules", response_model=List[schemas.AchieveResponse], tags=["Admin_select"])
async def get_achieve_rules(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Achieve, session)



# Student
@router.get("/students/{id}", response_model=schemas.StudentResponse, tags=["Admin_select"])
async def get_student(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Student, id, session)

@router.get("/students/{id}/parents", response_model=List[schemas.ParentResponse], tags=["Admin_select"])
async def get_student_parents(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Parent, session, filters={'student_id': id})

@router.get("/students/{id}/tests/last/date", tags=["Admin_select"])
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

@router.get("/students/{id}/tests", response_model=List[schemas.TestResponse], tags=["Admin_select"])
async def get_student_tests(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1
    result = await session.execute(
        select(models.Test).where(models.Test.timestamp.between(start_ts, end_ts), models.Test.student_id == id)
    )
    return result.scalars().all()


@router.get("/students/{id}/games", response_model=List[schemas.StudentGame], tags=["Admin_select"])
async def get_student_games(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1

    Gamer = models.Gamer
    Game = models.Game

    stmt = (
        select(Game.id, Game.timestamp, Gamer.team, Gamer.caught, Gamer.freeded, Gamer.is_survived, Game.winner)
        .join(Gamer, Gamer.game_id == Game.id )
        .where( Gamer.student_id == id, Game.timestamp.between(start_ts, end_ts))
        .order_by(Game.timestamp)
    )
    result = await session.execute(stmt)
    rows = result.all()

    return [ schemas.StudentGame(
                id = row[0],
                timestamp = row[1],
                team = row[2],
                caught = row[3],
                freeded = row[4],
                is_survived = 0 if row[5] is False else 1,
                won = 'Yes' if row[2] == row[6] else 'No'
            ) for row in rows]

@router.get("/students/{student_id}/attendances/percent", response_model=schemas.AttendancePercent, tags=["Admin_select"])
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

@router.get("/students/{id}/achievements", tags=["Admin_select"])
async def get_student_achieves(id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(S.id, A.category, A.name, A.image, S.level, S.in_profile, A.effect, A.trigger, A.desc)
        .join(A, S.achieve_id == A.id )
        .where( S.student_id == id )
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"id": row[0],
             "category": row[1],
             "name": row[2],
             "image": row[3],
             "level": row[4],
             "in_profile": row[5],
             "effect": row[6],
             "trigger": row[7],
             "desc": row[8]} for row in rows]

@router.get("/camps/groups/{group_id}/liders", tags=["Admin_select"])
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
                'phone': student.phone or '',
                'speed': test.speed,
                'stamina': test.stamina,
                'climbing': test.climbing,
                'evasion': test.evasion,
                'hiding': test.hiding,  
                'achieves': await getAchievements(student.id, session)
            }
            liders.append(lider)
    return liders

async def getAchievements(student_id: int, session: AsyncSession = Depends(get_session)):
    A = models.Achieve
    S = models.Achievement
    stmt = (
        select(A.name, A.image, S.level)
        .join(A, S.achieve_id == A.id )
        .where(
            S.student_id == student_id,
            S.in_profile == True
        )
        .order_by(asc(A.name))
    )
    result = await session.execute(stmt)
    rows = result.all()
    return [{"name": row[0], "image": row[1], "level": row[2]} for row in rows]


# Drills
@router.get("/drills/all", response_model=List[schemas.DrillResponse], tags=["Admin_select"])
async def get_base_drills(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Drill, session)

@router.get("/drills/{id}", response_model=schemas.DrillResponse, tags=["Admin_select"])
async def get_base_drill(id: int, session: AsyncSession = Depends(get_session)):
    return await CRUD.read(models.Drill, id, session)

# Metrics
@router.get("/settings/metrics/all", response_model=List[schemas.MetricResponse], tags=["Admin_select"])
async def get_base_drills(session: AsyncSession = Depends(get_session)):
    return await CRUD.get(models.Metric, session)


# Schedule
@router.get("/camps/{id}/schedule", response_model=List[schemas.CampScheduleResponse], tags=["Admin_select"])
async def get_camp_schedule( id: int, session: AsyncSession = Depends(get_session)):
    Camp = models.Camp
    Group = models.Group
    Coach = models.Coach
    GS = models.GroupSchedule

    stmt = (
        select( GS.id, GS.weekday, GS.hour, GS.minute, Group.name, Coach.first_name, Coach.last_name, Coach.camp_id, Camp.name)
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
                time=f"{row[2]}:{row[3]}",
                group=row[4],
                coach=coach_name,
            )
        )
    return schedule


# Statistics
@router.get("/camps/{id}/statistics/last", response_model=schemas.CampTestAverages, tags=["Admin_select"])
async def get_camp_last_statistics(id: int, session: AsyncSession = Depends(get_session)):
    Test = models.Test
    Student = models.Student
    Group = models.Group

    # Подзапрос: выбираем максимальный timestamp для каждого студента
    subquery = (
        select(
            Test.student_id,
            func.max(Test.timestamp).label("last_ts")
        )
        .join(Student, Student.id == Test.student_id)
        .join(Group, Group.id == Student.group_id)
        .where(Group.camp_id == id)
        .group_by(Test.student_id)
        .subquery()
    )

    # Основной запрос: выбираем тесты с этими последними timestamp
    stmt = (
        select(
            func.avg(Test.speed).label("avg_speed"),
            func.avg(Test.stamina).label("avg_stamina"),
            func.avg(Test.climbing).label("avg_climbing"),
            func.avg(Test.evasion).label("avg_evasion"),
            func.avg(Test.hiding).label("avg_hiding"),
        )
        .join(Student, Student.id == Test.student_id)
        .join(Group, Group.id == Student.group_id)
        .join(subquery, (subquery.c.student_id == Test.student_id) & (subquery.c.last_ts == Test.timestamp))
    )

    result = await session.execute(stmt)
    row = result.one_or_none()

    if row:
        return {
            "speed": row.avg_speed,
            "stamina": row.avg_stamina,
            "climbing": row.avg_climbing,
            "evasion": row.avg_evasion,
            "hiding": row.avg_hiding
        }
    else:
        return {
            "speed": None,
            "stamina": None,
            "climbing": None,
            "evasion": None,
            "hiding": None
        }


@router.get("/camps/{camp_id}/students/tests/last_date", tags=["Admin_select"])
async def get_camp_last_test(camp_id: int, session: AsyncSession = Depends(get_session)):
    Group = models.Group
    Student = models.Student
    Test = models.Test

    stmt = (
        select(Test)
        .join(Student, Student.id == Test.student_id)
        .join(Group, Group.id == Student.group_id)
        .where(Group.camp_id == camp_id)
        .order_by(desc(Test.timestamp))
        .limit(1)
    )
    
    result = await session.execute(stmt)
    test = result.scalar_one_or_none()

    isTests = True if test else False
    timestamp = test.timestamp if test else int(datetime.now().timestamp() * 1000)
    date = datetime.fromtimestamp(timestamp / 1000)

    return {"year": date.year, "month": date.month, "isTests": isTests}


@router.get("/camps/{id}/groups/tests", response_model=List[schemas.CampTestResponse], tags=["Admin_select"])
async def get_camp_groups_statistics(id: int, year: int, month: int, session: AsyncSession = Depends(get_session)):
    start_ts = int(datetime(year, month, 1).timestamp() * 1000)
    end_ts = int(datetime(year + (month // 12), (month % 12) + 1, 1).timestamp() * 1000) - 1

    Test = models.Test
    Student = models.Student
    Group = models.Group

    stmt = (
        select(
            Test.timestamp,
            Group.id.label("group_id"),
            Group.name.label("group_name"),

            func.avg(Test.speed).label("avg_speed"),
            func.avg(Test.stamina).label("avg_stamina"),
            func.avg(Test.climbing).label("avg_climbing"),
            func.avg(Test.evasion).label("avg_evasion"),
            func.avg(Test.hiding).label("avg_hiding"),
        )
        .join(Student, Student.id == Test.student_id)
        .join(Group, Group.id == Student.group_id)
        .where(Group.camp_id == id, Test.timestamp.between(start_ts, end_ts))
        .group_by(Test.timestamp, Group.id)
        .order_by(Test.timestamp, Group.id)
    )

    result = await session.execute(stmt)
    rows = result.all()

    return [{
            "timestamp": row[0],
            "group_id": row[1],
            "group_name": row[2],

            "speed": row[3],
            "stamina": row[4],
            "climbing": row[5],
            "evasion": row[6],
            "hiding": row[7]
        } for row in rows]


@router.get("/camps/{id}/statistics/liders", response_model=List[schemas.StudentTestLider], tags=["Admin_select"])
async def get_camp_liders(id: int, test_name: str, session: AsyncSession = Depends(get_session)):
    valid_tests = {"speed", "stamina", "climbing", "evasion", "hiding"}
    if test_name not in valid_tests:
        raise HTTPException(status_code=400, detail=f"Invalid test_name: {test_name}")

    Test = models.Test
    Student = models.Student
    Group = models.Group

    # Подзапрос: последние тесты студентов
    subquery = (
        select(
            Test.student_id,
            func.max(Test.timestamp).label("last_ts")
        )
        .join(Student, Student.id == Test.student_id)
        .join(Group, Group.id == Student.group_id)
        .where(Group.camp_id == id)
        .group_by(Test.student_id)
        .subquery()
    )

    # Основной запрос: студенты и их последние тесты
    stmt = (
        select(
            Student.id,
            Student.photo,
            Student.first_name,
            Student.last_name,
            Test.speed,
            Test.stamina,
            Test.climbing,
            Test.evasion,
            Test.hiding,
            Group.name
        )
        .join(Test, Test.student_id == Student.id)
        .join(Group, Group.id == Student.group_id)
        .join(subquery, (subquery.c.student_id == Test.student_id) & (subquery.c.last_ts == Test.timestamp))
        .where(Group.camp_id == id)
        .order_by(getattr(Test, test_name).desc().nullslast())
        .limit(10)
    )

    result = await session.execute(stmt)
    rows = result.all()

    return [
        {
            "id": row.id,
            "photo": row.photo,
            "first_name": row.first_name,
            "last_name": row.last_name,
            "speed": row.speed,
            "stamina": row.stamina,
            "climbing": row.climbing,
            "evasion": row.evasion,
            "hiding": row.hiding,
            "group_name": row.name
        }
        for row in rows
    ]


@router.get("/camps/{id}/statistics/achieves", tags=["Admin_select"])
async def get_camp_achieves(id: int, session: AsyncSession = Depends(get_session)):
    Achieve = models.Achieve
    StudentAchieve = models.Achievement
    Student = models.Student
    Group = models.Group

    stmt = (
        select(
            Achieve.id,
            Achieve.image,
            Achieve.name,
            Achieve.category,
            func.count(StudentAchieve.student_id).label("count")
        )
        .join(StudentAchieve, StudentAchieve.achieve_id == Achieve.id)
        .join(Student, Student.id == StudentAchieve.student_id)
        .join(Group, Group.id == Student.group_id)
        .where(Group.camp_id == id)
        .group_by(Achieve.id, Achieve.image, Achieve.name, Achieve.category)
        .order_by(Achieve.category, Achieve.name)
    )

    result = await session.execute(stmt)
    rows = result.all()

    return [
        {
            "id": row[0],
            "image": row[1],
            "name": row[2],
            "category": row[3],
            "count": row[4]
        }
        for row in rows
    ]


@router.get("/camps/{camp_id}/groups/achieves/count", response_model=List[schemas.GroupAchieve], tags=["Admin_select"])
async def get_groups_achieve_count(camp_id: int, achieve_id: int, session: AsyncSession = Depends(get_session)):
    StudentAchieve = models.Achievement
    Student = models.Student
    Group = models.Group

    # LEFT JOIN, чтобы включить группы без студентов с достижением
    stmt = (
        select(
            Group.id,
            Group.name,
            func.count(StudentAchieve.student_id).label("count")
        )
        .join(Student, Student.group_id == Group.id)
        .outerjoin(StudentAchieve, (StudentAchieve.student_id == Student.id) & (StudentAchieve.achieve_id == achieve_id))
        .where(Group.camp_id == camp_id)
        .group_by(Group.id, Group.name)
        .order_by(Group.name)
    )

    result = await session.execute(stmt)
    rows = result.all()

    return [
        schemas.GroupAchieve(
            group_id=row[0],
            group_name=row[1],
            achieves_count=row[2]
        )
        for row in rows
    ]


@router.get("/camps/groups/{group_id}/honores", response_model=List[schemas.StudentAchieveLider], tags=["Admin_select"])
async def get_group_honores(group_id: int, achieve_id: int, session: AsyncSession = Depends(get_session)):
    Student = models.Student
    StudentAchieve = models.Achievement
    Achieve = models.Achieve

    # 1. Получаем студентов, у которых есть достижение achieve_id
    main_stmt = (
        select(
            Student.id,
            Student.photo,
            Student.first_name,
            Student.last_name
        )
        .join(StudentAchieve, StudentAchieve.student_id == Student.id)
        .where(Student.group_id == group_id, StudentAchieve.achieve_id == achieve_id)
        .order_by(Student.first_name)
    )

    main_result = await session.execute(main_stmt)
    student_rows = main_result.all()
    student_ids = [row.id for row in student_rows]

    if not student_ids:
        return []

    # 2. Получаем все достижения этих студентов (включая другие достижения)
    images_stmt = (
        select(
            StudentAchieve.student_id,
            Achieve.id,
            Achieve.image,
            Achieve.name,
            StudentAchieve.level
        )
        .join(Achieve, Achieve.id == StudentAchieve.achieve_id)
        .where(StudentAchieve.student_id.in_(student_ids))
    )
    images_result = await session.execute(images_stmt)
    image_rows = images_result.all()

    # 3. Собираем достижения по студентам
    achieves = defaultdict(list)

    for student_id, id, image, name, level in image_rows:
        achieves[student_id].append({"id": id, "image": image, 'name': name, 'level': level})

    # 4. Собираем финальный ответ
    response = []
    for row in student_rows:
        response.append({
            "id": row.id,
            "photo": row.photo,
            "first_name": row.first_name,
            "last_name": row.last_name,
            "achieves": achieves.get(row.id, [])
        })

    return response
