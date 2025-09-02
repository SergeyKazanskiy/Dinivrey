from typing import List, Dict, Any, Optional
from sqlalchemy import delete, insert, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from firebase_admin import messaging, exceptions as fb_exceptions
from datetime import timedelta, datetime
from models import Student, Notification

STORAGE_PERIOD_DAYS = 7

# payloads = [
#     {
#         "student_id": 1,
#         "added":   [{"name": "Speed", "level": 1, "rule": "Win race"}],
#         "updated": [{"name": "Stamina", "level": 2, "rule": "Run 5 km"}]
#     },
# ]

LEVELS = {
    1: "Common",
    2: "Rare",
    3: "Epic",
    4: "Mythic",
    5: "Legendary"
}

# ======================= Privite =======================

def _build_notifications(added, updated) -> List[str]:
    notifications = []
    for a in added:
        lvl = LEVELS.get(a["level"], str(a["level"]))
        notifications.append(f"🎉 Congratulations! You’ve unlocked a new achievement: {a['name']} ({lvl})")
     
    for u in updated:
        lvl = LEVELS.get(u["level"], str(u["level"]))
        notifications.append(f"⭐ Great progress! Your achievement {u['name']} has been upgraded to {lvl}")

    return notifications

async def _send_to_student(token: str, notifications: List[str]):
    last_error = None
    for note in notifications:
        msg = messaging.Message(
            notification=messaging.Notification(
                title="Achievement",
                body=note
            ),
            token=token,
        )
        try:
            messaging.send(msg)
        except fb_exceptions.FirebaseError as e:
            last_error = str(e)

    return {
        "success": last_error is None,
        "error_message": last_error
    }

def _make_notification(student: Optional[Student], achievements: List[Dict[str, Any]], error: Optional[str] = None) -> Dict[str, Any]:
    return {
        "first_name": getattr(student, "first_name", None),
        "second_name": getattr(student, "last_name", None),
        "achievements": achievements,
        **({"error_message": error} if error else {})
    }

async def add_new_notifications(student_id: int, data: List[str], db: AsyncSession):
    notifications = [{"student_id": student_id, "notification": text} for text in data]
    await db.execute(insert(Notification), notifications)
    await db.commit()

# ======================= Public =======================

class NotificationService:

    @staticmethod
    async def save_or_update_token( session: AsyncSession, student_id: int, token: str) -> Dict[str, Any]:

        result = await session.execute(
            select(Student).where(Student.id == student_id)
        )
        student = result.scalars().first()

        if not student:
            return {"isOk": False, "error_message": "Student not found"}

        student.token_FCM = token
        await session.commit()

        return {"isOk": True}


    @staticmethod
    async def send_notifications(session: AsyncSession, payloads: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
        notifications = []

        for payload in payloads:
            student_id = payload["student_id"]
            added = payload.get("added", [])
            updated = payload.get("updated", [])
            
            # Достаём студента
            result = await session.execute(select(Student).where(Student.id == student_id))
            student = result.scalars().first()

            # Собираем достижения
            achievements = [
                {
                    "isNew": is_new,
                    "name": a["name"],
                    "level": LEVELS.get(a["level"], str(a["level"])),
                    "rule": a["rule"]
                }
                for is_new, items in ((True, added), (False, updated))
                for a in items
            ]

            # Если студент не найден
            if not student:
                notifications.append(_make_notification(student, achievements, "Student not found"))
                continue

            # Сохраняем уведомления в базе
            built_notifications = _build_notifications(added, updated)
            await add_new_notifications(student_id, built_notifications, session)

            # Если у студента не нет токена
            if not student.token_FCM:
                notifications.append(_make_notification(student, achievements, "Student has no token for notification"))
                continue

            # Отправляем пуши
            res = await _send_to_student(student.token_FCM, built_notifications)

            if res["success"]:
                notifications.append(_make_notification(student, achievements))
            else:
                student.token_FCM = None
                notifications.append(_make_notification(student, achievements, res["error_message"]))

        await session.commit()
        return notifications


    @staticmethod
    async def delete_old_notifications(session: AsyncSession):
        cutoff_date = datetime.now() - timedelta(days=STORAGE_PERIOD_DAYS)

        await session.execute(
            delete(Notification).where(Notification.created_at < cutoff_date)
        )
        await session.commit()

    @staticmethod
    async def delete_notifications(student_id: int, db: AsyncSession) -> bool:
        await db.execute(
            delete(Notification).where(Notification.student_id == student_id)
        )
        await db.commit()
        return True    

    @staticmethod
    async def get_notifications(student_id: int, db: AsyncSession) -> List[str]:
        result = await db.execute(
            select(Notification.notification)
            .where(Notification.student_id == student_id)
            .order_by(Notification.created_at.desc())
        )
        return [row[0] for row in result.all()]
    
    @staticmethod
    async def get_notifications_count(student_id: int, db: AsyncSession) -> int:
        result = await db.execute(
            select(func.count()).where(Notification.student_id == student_id)
        )
        return result.scalar_one()