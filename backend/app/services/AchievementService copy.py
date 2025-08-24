from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from models import Rule, Achievement, Achieve, Test
from typing import Dict, List


class AchievementService:

    @staticmethod
    async def update_test_achievements(student_id: int, test_id: int, session: AsyncSession):
        # Получаем тест по id
        result = await session.execute(select(Test).where(Test.id == test_id))
        test = result.scalar_one_or_none()
        if not test:
            raise ValueError(f"Test with id={test_id} not found")

        # Собираем словарь параметров в test_result
        test_result = {
            "Speed": test.speed,
            "Climbing": test.climbing,
            "Evasion": test.evasion,
            "Stamina": test.stamina,
            "Hiding": test.hiding
        }
        
        added: List[dict] = []
        updated: List[dict] = []

        # Получаем все достижения
        achieves = (await session.execute(select(Achieve))).scalars().all()

        for achieve in achieves:
            # Находим все правила для этого достижения
            rules = (await session.execute(
                select(Rule).where(Rule.achieve_id == achieve.id)
            )).scalars().all()

            # Группируем правила по уровню
            rules_by_level: Dict[int, List[Rule]] = {}
            for rule in rules:
                rules_by_level.setdefault(rule.level, [])
                rules_by_level[rule.level].append(rule)

            max_level = 0
            best_rule_group = None

            # Проверяем каждый уровень
            for level, ruleset in rules_by_level.items():
                ok = True
                for rule in ruleset:
                    value = test_result.get(rule.parameter)
                    if value is None:
                        ok = False
                        break

                    if rule.condition == ">" and not (value > rule.value):
                        ok = False
                        break
                    elif rule.condition == "<" and not (value < rule.value):
                        ok = False
                        break
                    elif rule.condition == "=" and not (value == rule.value):
                        ok = False
                        break

                if ok and level > max_level:
                    max_level = level
                    best_rule_group = ruleset

            if max_level == 0:
                continue

            # Проверяем, есть ли запись у студента
            student_achieve = await session.scalar(
                select(Achievement).where(
                    Achievement.student_id == student_id,
                    Achievement.achieve_id == achieve.id
                )
            )

            # Формируем строку правила
            rule_str = " и ".join(
                f"{r.parameter} {r.condition} {r.value}" for r in best_rule_group
            )

            if student_achieve is None:
                # Добавляем новое достижение
                new_achieve = Achievement(
                    student_id=student_id,
                    achieve_id=achieve.id,
                    level=max_level
                )
                session.add(new_achieve)
                added.append({
                    "name": achieve.name,
                    "level": max_level,
                    "rule": rule_str
                })

            elif max_level > student_achieve.level:
                # Обновляем уровень
                student_achieve.level = max_level
                updated.append({
                    "name": achieve.name,
                    "level": max_level,
                    "rule": rule_str
                })

        await session.commit()

        return {
            "added": added,
            "updated": updated
        }