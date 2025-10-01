from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, join, func, cast, Float
from models import Rule, Achievement, Student, Test, Game, Gamer, Event, Attendance, Achieve


# ======================= утилиты =======================

def _cmp(lhs: float, op: str, rhs: float) -> bool:
    if op == ">":
        return lhs > rhs
    if op == "<":
        return lhs < rhs
    if op == "=":
        return lhs == rhs
    return False

def _rule_group_text(ruleset: List[Rule]) -> str:
    return " и ".join(f"{r.parameter} {r.condition} {r.selection} {r.value}" for r in ruleset)


def max_value(data: List[Dict[str, Any]], key: str):
    return max(item.get(key) for item in data if key in item)

def sum_value(data: List[Dict[str, Any]], key: str):
    return sum(item.get(key, 0) for item in data)

def last_value(data: List[Dict[str, Any]], key: str):
    sorted_data = sorted(data, key=lambda x: x.get("timestamp"))
    return sorted_data[-1].get(key) if sorted_data else None

def count_value(data: List[Dict[str, Any]], key: str):
    return sum(1 for item in data if key in item and item.get(key))


# ======================= Вспомогательные функции =======================

def _group_rules_by_level(rules: List[Rule]) -> Dict[int, dict]:
    by_level: Dict[int, dict] = {}
    for rule in rules:
        if rule.level not in by_level:
            by_level[rule.level] = {"type": rule.type, "rules": []}
        by_level[rule.level]["rules"].append(rule)
    return by_level

async def check_level(rules: List[Rule], rtype: str, student_data: List[Dict[str, Any]]) -> bool:
    results: List[bool] = []

    for rule in rules:
        value = None
        if rule.selection == "Current":
            value = last_value(student_data, rule.parameter)
        elif rule.selection == "Max":
            value = max_value(student_data, rule.parameter)
        elif rule.selection == "Sum":
            value = sum_value(student_data, rule.parameter)
        elif rule.selection == "Count":
            value = count_value(student_data, rule.parameter)

        if value is not None:
            results.append(_cmp(value, rule.condition, rule.value))
        else:
            results.append(False)

    return all(results) if rtype == "AND" else any(results)


async def build_student_data(category: str, student_id: int, session: AsyncSession) -> List[Dict[str, Any]]:
    data: List[Dict[str, Any]] = []

    if category == "Test":
        result = await session.execute(
            select(Test).where(Test.student_id == student_id)
        )
        tests = result.scalars().all()

        for test in tests:
            data.append({
                "timestamp": test.timestamp,
                "Speed": test.speed,
                "Climbing": test.climbing,
                "Evasion": test.evasion,
                "Stamina": test.stamina,
                "Hiding": test.hiding,
            })

    elif category == "Game":
        result = await session.execute(
            select(Gamer, Game)
            .join(Game, Gamer.game_id == Game.id)
            .where(Gamer.student_id == student_id)
        )
        rows = result.all()

        for gamer, game in rows:
            data.append({
                "timestamp": game.timestamp,
                "Caught": gamer.caught,
                "Freeded": gamer.freeded,
                "Is_survived": 1 if gamer.is_survived else 0,
            })

    elif category == "Participate":
        stmt = (
            select(
                Event.type,
                func.sum(cast(Attendance.present, Float)).label("attendance_count")
            )
            .join(Event, Event.id == Attendance.event_id)
            .where(Attendance.student_id == student_id)
            .group_by(Event.type)
        )
        result = await session.execute(stmt)
        rows = result.all()

        attendance_counts = {t: 0 for t in ["Training", "Exam", "Game"]}
        attendance_counts.update({row.type: int(row.attendance_count) for row in rows})
        data.append(attendance_counts)

    return data


async def assign_achievement_level(student: "Student", achievement_id: int, by_level: Dict[int, dict], session: AsyncSession, category: str, achieve: "Achievement") -> Dict[str, Any]:
    student_data = await build_student_data(category, student.id, session)

    max_level = 0
    best_ruleset: Optional[List[Rule]] = None

    for level, data in by_level.items():
        ok = await check_level(data["rules"], data["type"], student_data)
        if ok and level > max_level:
            max_level = level
            best_ruleset = data["rules"]

    student_ach = await session.scalar(
        select(Achievement).where(
            Achievement.student_id == student.id,
            Achievement.achieve_id == achievement_id,
        )
    )

    added, updated = [], []
    rule_str = _rule_group_text(best_ruleset) if best_ruleset else ""

    if max_level == 0 or not best_ruleset:
        if student_ach is not None:
            await session.delete(student_ach)
        return {"student_id": student.id, "added": [], "updated": []}

    if student_ach is None:
        session.add(Achievement(student_id=student.id, achieve_id=achievement_id, level=max_level))
        added.append({"name": achieve.name, "level": max_level, "rule": rule_str})
    elif max_level > student_ach.level:
        student_ach.level = max_level
        updated.append({"name": achieve.name, "level": max_level, "rule": rule_str})

    return {"student_id": student.id, "added": added, "updated": updated}


# ======================= публичный сервис =======================

class AchievementSynс:

    @staticmethod
    async def sync_new_achievement(achievement_id: int, rules: List[Rule], category: str, session: AsyncSession):
        by_level = _group_rules_by_level(rules)

        achieve = await session.scalar(select(Achieve).where(Achieve.id == achievement_id))

        result = await session.execute(select(Student))
        students = result.scalars().all()

        output = []
        for student in students:
            res = await assign_achievement_level(student, achievement_id, by_level, session, category, achieve)
            if res["added"] or res["updated"]:
                output.append(res)

        await session.commit()
        return output