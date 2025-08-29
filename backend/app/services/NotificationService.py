from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from firebase_admin import messaging, exceptions as fb_exceptions

from models import Student

# payloads = [
#     {
#         "student_id": 1,
#         "added":   [{"name": "Speed", "level": 1, "rule": "Win race"}],
#         "updated": [{"name": "Stamina", "level": 2, "rule": "Run 5 km"}]
#     },
#     ...
# ]

LEVELS = {
    1: "Common",
    2: "Rare",
    3: "Epic",
    4: "Mythic",
    5: "Legendary"
}

# ======================= Privite =======================

def _build_notifications(added, updated) -> list[str]:
    notifications = []
    for a in added:
        lvl = LEVELS.get(a["level"], str(a["level"]))
        notifications.append(f"🎉 Congratulations! You’ve unlocked a new achievement: {a['name']} ({lvl})")
     
    for u in updated:
        lvl = LEVELS.get(u["level"], str(u["level"]))
        notifications.append(f"⭐ Great progress! Your achievement {u['name']} has been upgraded to {lvl}")

    return notifications

async def _send_to_student(token: str, notifications: list[str]):
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
    sent, failed = [], []

    for payload in payloads:
        student_id = payload["student_id"]
        added = payload.get("added", [])
        updated = payload.get("updated", [])

        result = await session.execute(
            select(Student).where(Student.id == student_id)
        )
        student = result.scalars().first()

        if not student or not student.token_FCM:
            failed.append({
                "first_name": getattr(student, "first_name", None),
                "second_name": getattr(student, "last_name", None),
                "phone": getattr(student, "phone", None),
                "achievements": added + updated,
                "error_message": "Student not found or no token"
            })
            continue

        # 1. Collect and send notifications
        notifications = _build_notifications(added, updated)
        res = await _send_to_student(student.token_FCM, notifications)

        # 2. Collect the achievements array for the answer
        achievements = []
        for a in added:
            achievements.append({
                "isNew": True,
                "name": a["name"],
                "level": LEVELS.get(a["level"], str(a["level"])),
                "rule": a["rule"]
            })
        for u in updated:
            achievements.append({
                "isNew": False,
                "name": u["name"],
                "level": LEVELS.get(u["level"], str(u["level"])),
                "rule": u["rule"]
            })

        if res["success"]:
            sent.append({
                "first_name": student.first_name,
                "second_name": student.last_name,
                "phone": student.phone,
                "achievements": achievements
            })
        else:
            student.token_FCM = None
            failed.append({
                "first_name": student.first_name,
                "second_name": student.last_name,
                "phone": student.phone,
                "achievements": achievements,
                "error_message": res["error_message"]
            })

    await session.commit()
    return {"sent": sent, "failed": failed}
