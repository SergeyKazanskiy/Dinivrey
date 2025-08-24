from typing import Dict, List, Optional, Awaitable, Callable
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from models import Rule, Achievement, Achieve, Test, Gamer, Event, Attendance


# ======================= маленькие утилиты =======================

def _group_rules_by_level(rules: List[Rule]) -> Dict[int, List]:
    by_level: Dict[int, List] = {}
    for r in rules:
        by_level.setdefault(r.level, []).append(r)
    return by_level

def _rule_group_text(ruleset: List[Rule]) -> str:
    return " и ".join(f"{r.parameter} {r.condition} {r.selection} {r.value}" for r in ruleset)

def _cmp(lhs: float, op: str, rhs: float) -> bool:
    if op == ">":  return lhs > rhs
    if op == "<":  return lhs < rhs
    if op == "=":  return lhs == rhs
    return False


# --- проверка уровней по сценариям ---

def _check_common_level(ruleset: List[Rule], current: Dict[str, float]) -> bool:
    # все правила уровня должны выполниться по текущим значениям (AND)
    for r in ruleset:
        v = current.get(r.parameter)
        
        if v is None or not _cmp(v, r.condition, r.value):
            return False
    return True

async def _check_personal_level(
    ruleset: List[Rule],
    current: Dict[str, float],
    prev_max_getter: Callable[[str], Awaitable[Optional[float]]],
) -> bool:
    # достаточно одного правила уровня (OR)
    for r in ruleset:
        if r.selection != "Max":
            # допускаем смешанные правила: если selection не Max — трактуем как "Current"
            v = current.get(r.parameter)
            if v is not None and _cmp(v, r.condition, r.value):
                return True
            continue

        v = current.get(r.parameter)
        if v is None:
            continue
        prev_max = await prev_max_getter(r.parameter) or 0
        # трактовка:
        #   ">" : текущее > prev_max + delta
        #   "=" : текущее == prev_max + delta
        #   "<" : текущее < prev_max - delta   (резкое падение, если понадобится)
        target = prev_max + r.value if r.condition in (">", "=") else prev_max - r.value
        if _cmp(v, r.condition, target):
            return True
    return False

async def _check_cumulative_level(
    ruleset: List[Rule],
    sum_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    count_getter: Optional[Callable[[str], Awaitable[Optional[int]]]] = None,
) -> bool:
    # в этом сценарии, как правило, одно правило на уровень
    # поддержим и несколько — все должны выполниться (AND), чтобы не ломать расширяемость
    for r in ruleset:
        agg_val: Optional[float] = None
        if r.selection == "Sum":
            if not sum_getter:
                return False
            agg_val = await sum_getter(r.parameter) or 0
        elif r.selection == "Count":
            if not count_getter:
                return False
            agg_val = float(await count_getter(r.parameter) or 0)
        else:
            # на всякий случай — не поддерживаемые selection считаем невыполненными
            return False

        if not _cmp(agg_val, r.condition, r.value):
            return False
    return True


# --- общий обработчик для любых сценариев ---

async def _process_achievements1(
    *,
    session: AsyncSession,
    student_id: int,
    current_values: Dict[str, float],
    type: str,  # "Common" | "Personal" | "Cumulative"
    prev_max_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    sum_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    count_getter: Optional[Callable[[str], Awaitable[Optional[int]]]] = None,
):
    added: List[dict] = []
    updated: List[dict] = []

    # Берём все достижения
    achieves = (await session.execute(select(Achieve))).scalars().all()

    for achieve in achieves:
        # Берём правила только нужного сценария
        rules = (
            await session.execute(
                select(Rule).where(
                    Rule.achieve_id == achieve.id,
                    Rule.type == type #???
                )
            )
        ).scalars().all()
   
        if not rules:
            continue
         
        by_level = _group_rules_by_level(rules)
        max_level = 0
        best_ruleset: Optional[List] = None

        for level, ruleset in by_level.items():
            ok = False
            if type == "Common":
                ok = _check_common_level(ruleset, current_values)  
            elif type == "Personal":
                ok = await _check_personal_level(ruleset, current_values, prev_max_getter=prev_max_getter or (lambda p: None))  # type: ignore
            elif type == "Cumulative":
                ok = await _check_cumulative_level(ruleset, sum_getter=sum_getter, count_getter=count_getter)
            
            if ok and level > max_level:
                max_level = level
                best_ruleset = ruleset

        if max_level == 0 or not best_ruleset:
            continue

        student_ach = await session.scalar(
            select(Achievement).where(
                Achievement.student_id == student_id,
                Achievement.achieve_id == achieve.id
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


async def _process_achievements(
    *,
    session: AsyncSession,
    student_id: int,
    current_values: Dict[str, float],
    types: List[str],  # например: ["Common", "Personal"]
    prev_max_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    sum_getter: Optional[Callable[[str], Awaitable[Optional[float]]]] = None,
    count_getter: Optional[Callable[[str], Awaitable[Optional[int]]]] = None,
):
    added: List[dict] = []
    updated: List[dict] = []

    # Берём все достижения
    achieves = (await session.execute(select(Achieve))).scalars().all()

    for achieve in achieves:
        # Берём правила только нужных сценариев
        rules = (
            await session.execute(
                select(Rule).where(
                    Rule.achieve_id == achieve.id,
                    Rule.type.in_(types)  # <<< изменено
                )
            )
        ).scalars().all()
   
        if not rules:
            continue
         
        by_level = _group_rules_by_level(rules)
        max_level = 0
        best_ruleset: Optional[List] = None

        for level, ruleset in by_level.items():
            ok = False
            # теперь проверяем по типу правила
            if all(r.type == "Common" for r in ruleset):
                ok = _check_common_level(ruleset, current_values)  
            elif all(r.type == "Personal" for r in ruleset):
                ok = await _check_personal_level(
                    ruleset,
                    current_values,
                    prev_max_getter=prev_max_getter or (lambda p: None)  # type: ignore
                )
            elif all(r.type == "Cumulative" for r in ruleset):
                ok = await _check_cumulative_level(
                    ruleset,
                    sum_getter=sum_getter,
                    count_getter=count_getter
                )
            else:
                ok = False
            
            if ok and level > max_level:
                max_level = level
                best_ruleset = ruleset

        if max_level == 0 or not best_ruleset:
            continue

        student_ach = await session.scalar(
            select(Achievement).where(
                Achievement.student_id == student_id,
                Achievement.achieve_id == achieve.id
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
            types=["Common", "Personal"],
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
                    Gamer.id != gamer_id,
                )
            )

        return await _process_achievements(
            session=session,
            student_id=student_id,
            current_values=current,
            types=["Common", "Cumulative"],
            prev_max_getter=prev_max_getter,
            sum_getter=sum_getter,
            count_getter=None,
        )

    @staticmethod
    async def update_participate_achievements( student_id: int, session: AsyncSession, ):
        
        async def count_getter(param: str) -> int:
            value = await session.scalar(
                select(func.count())
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
            types=["Cumulative"],
            prev_max_getter=None,
            sum_getter=None,
            count_getter=count_getter,
        )
