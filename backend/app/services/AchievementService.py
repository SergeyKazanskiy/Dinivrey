from typing import Dict, List, Optional, Awaitable, Callable
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from models import Rule, Achievement, Achieve, Test, Gamer, Event, Attendance


# ======================= утилиты =======================

def _group_rules_by_level(rules: List[Rule]) -> Dict[int, dict]:
    by_level: Dict[int, dict] = {}
    for r in rules:
        if r.level not in by_level:
            by_level[r.level] = {"type": r.type, "rules": []}
        by_level[r.level]["rules"].append(r)
    return by_level


def _rule_group_text(ruleset: List[Rule]) -> str:
    return " и ".join(f"{r.parameter} {r.condition} {r.selection} {r.value}" for r in ruleset)

def _cmp(lhs: float, op: str, rhs: float) -> bool:
    if op == ">":  return lhs > rhs
    if op == "<":  return lhs < rhs
    if op == "=":  return lhs == rhs
    return False


# --- проверка уровней по сценариям ---

async def _check_level(
    ruleset: List[Rule],
    logic_type: str,
    current: Dict[str, float],
    prev_max_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    sum_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    count_getter: Optional[Callable[[str], Awaitable[Optional[int]]]] = None,
) -> bool:
    results: List[bool] = []

    for r in ruleset:
        value: Optional[float] = None
        if r.selection == "Current":
            value = current.get(r.parameter)
        elif r.selection == "Max" and prev_max_getter:
            cur = current.get(r.parameter)
            if cur is not None:
                prev_max = await prev_max_getter(r.parameter) or 0
                target = prev_max + r.value if r.condition in (">", "=") else prev_max - r.value
                results.append(_cmp(cur, r.condition, target))
                continue
        elif r.selection == "Sum" and sum_getter:
            value = await sum_getter(r.parameter) or 0
        elif r.selection == "Count" and count_getter:
            value = float(await count_getter(r.parameter) or 0)

        if value is not None:
            results.append(_cmp(value, r.condition, r.value))
        else:
            results.append(False)

    return all(results) if logic_type == "AND" else any(results)


# --- общий обработчик для любых сценариев ---

async def _process_achievements(
    *,
    session: AsyncSession,
    student_id: int,
    current_values: Dict[str, float],
    prev_max_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    sum_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    count_getter: Optional[Callable[[str], Awaitable[Optional[int]]]] = None,
):
    added: List[dict] = []
    updated: List[dict] = []

    achieves = (await session.execute(select(Achieve))).scalars().all()

    for achieve in achieves:
        rules = (
            await session.execute(
                select(Rule).where(Rule.achieve_id == achieve.id)
            )
        ).scalars().all()
        if not rules:
            continue

        by_level = _group_rules_by_level(rules)
        max_level = 0
        best_ruleset: Optional[List[Rule]] = None

        for level, data in by_level.items():
            ok = await _check_level(
                data["rules"],
                data["type"],
                current_values,
                prev_max_getter=prev_max_getter,
                sum_getter=sum_getter,
                count_getter=count_getter,
            )
            if ok and level > max_level:
                max_level = level
                best_ruleset = data["rules"]

        if max_level == 0 or not best_ruleset:
            continue

        student_ach = await session.scalar(
            select(Achievement).where(
                Achievement.student_id == student_id,
                Achievement.achieve_id == achieve.id,
            )
        )

        rule_str = _rule_group_text(best_ruleset)

        if student_ach is None:
            session.add(Achievement(student_id=student_id, achieve_id=achieve.id, level=max_level))
            added.append({"name": achieve.name, "level": max_level, "rule": rule_str})
        elif max_level > student_ach.level:
            student_ach.level = max_level
            updated.append({"name": achieve.name, "level": max_level, "rule": rule_str})

    await session.commit()
    return {"added": added, "updated": updated}


# ======================= публичный сервис =======================

class AchievementService:

    @staticmethod
    async def update_test_achievements(student_id: int, test_id: int, session: AsyncSession):
        test = (await session.execute(select(Test).where(Test.id == test_id))).scalar_one_or_none()
        if not test:
            raise ValueError(f"Test with id={test_id} not found")

        current = {
            "Speed": test.speed,
            "Climbing": test.climbing,
            "Evasion": test.evasion,
            "Stamina": test.stamina,
            "Hiding": test.hiding,
        }

        # --- колбэки-агрегаторы для Tests ---
        async def prev_max_getter(param: str) -> Optional[float]:
            col = getattr(Test, param.lower(), None)
            if col is None:
                return None
            return await session.scalar(
                select(func.max(col)).where(
                    Test.student_id == student_id,
                    Test.id != test_id,  # не учитываем текущую запись
                )
            )

        async def sum_getter(param: str) -> Optional[float]:
            col = getattr(Test, param.lower(), None)
            if col is None:
                return None
            return await session.scalar(
                select(func.sum(col)).where(
                    Test.student_id == student_id,
                    Test.id != test_id,
                )
            )

        return await _process_achievements(
            session=session,
            student_id=student_id,
            current_values=current,
            prev_max_getter=prev_max_getter,
            sum_getter=sum_getter,
            count_getter=None,
        )

    @staticmethod
    async def update_game_achievements(student_id: int, gamer_id: int, session: AsyncSession):
        game = (await session.execute(select(Gamer).where(Gamer.id == gamer_id))).scalar_one_or_none()
        if not game:
            raise ValueError(f"Game with id={gamer_id} not found")

        is_surv = (1 if game.is_survived else 0) if game.is_survived is not None else None

        current = {
            "Caught": game.caught,
            "Freeded": game.freeded,
            "Is_survived": is_surv,
        }

        # --- колбэки-агрегаторы для Games ---
        async def prev_max_getter(param: str) -> Optional[float]:
            col = getattr(Gamer, param.lower(), None)
            if col is None:
                return None
            return await session.scalar(
                select(func.max(col)).where(
                    Gamer.student_id == student_id,
                    Gamer.id != gamer_id,
                )
            )

        async def sum_getter(param: str) -> Optional[float]:
            col = getattr(Gamer, param.lower(), None)
            if col is None:
                return None
            return await session.scalar(
                select(func.sum(col)).where(
                    Gamer.student_id == student_id,
                    #Gamer.id != gamer_id,
                )
            )

        return await _process_achievements(
            session=session,
            student_id=student_id,
            current_values=current,
            prev_max_getter=prev_max_getter,
            sum_getter=sum_getter,
            count_getter=None,
        )

    @staticmethod
    async def update_participate_achievements( student_id: int, session: AsyncSession, ):
        
        async def count_getter(param: str) -> int:
            value = await session.scalar(
                select(func.count())
                .select_from(Attendance)
                .join(Event, Event.id == Attendance.event_id)
                .where(
                    Attendance.student_id == student_id,
                    Event.type == param,
                    Attendance.present.is_(True),
                )
            )
            return value or 0
        
        return await _process_achievements(
            session=session,
            student_id=student_id,
            current_values={},
            prev_max_getter=None,
            sum_getter=None,
            count_getter=count_getter,
        )
