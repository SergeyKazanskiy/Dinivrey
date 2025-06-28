from pydantic import BaseModel
from typing import List, Optional


class CampResponse(BaseModel):
    id: int
    name: str
    groups: int # number of groups
    students: int # number of all students

    class Config:
        from_attributes = True


class CampScheduleResponse(BaseModel):
    id: int
    weekday: int
    hour: int
    minute: int
    group_id: int
    coach_name: str