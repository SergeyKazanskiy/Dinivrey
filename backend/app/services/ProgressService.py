from typing import List
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from models import Rule


class LastTest(BaseModel):
    speed: int
    stamina: int
    climbing: int
    evasion: int
    hiding: int


class ProgressService:
    @staticmethod
    async def calc_tests_progress( session: AsyncSession, last_test: LastTest, achieve_id: int ) -> float:
        """
        Возвращает средний прогресс (от 0.0 до 1.0), 
        показывающий, насколько студент близок к минимальному уровню достижения.
        И min_level (int) - минимальный уровень правил для данного achieve
        """

    # 1. Find the minimum level for a given achieve_id
        min_level_subq = (
            select(func.min(Rule.level))
            .where(Rule.achieve_id == achieve_id)
            .scalar_subquery()
        )

        # 2. Select all the rules of the minimum level
        stmt = (
            select(Rule)
            .where(Rule.achieve_id == achieve_id)
            .where(Rule.level == min_level_subq)
            .where(Rule.selection == "Current")
        )
        result = await session.execute(stmt)
        rules: List[Rule] = result.scalars().all()

        if not rules:
            return 0.0, 0

        # 3. Getting level type (AND / OR)
        mode = rules[0].type if rules else "AND"

        # 4. Count progress
        progresses: List[float] = []
        for rule in rules:
            student_value = getattr(last_test, rule.parameter.lower(), None)
            if student_value is not None and rule.value > 0:
                #print('!!!!!_10 ', student_value, rule.value)
                progress = min(student_value / (rule.value + 1), 1.0)
                progresses.append(progress)

        if not progresses:
            return 0.0, rules[0].level

        # 5. Choose a counting strategy
        if mode == "AND":
            progress = sum(progresses) / len(progresses)  # среднее
        elif mode == "OR":
            progress = max(progresses)  # максимум одного
        else:
            raise ValueError("Mode must be 'AND' или 'OR'")

        return round(progress, 2), rules[0].level
    

