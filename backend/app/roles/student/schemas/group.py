from pydantic import BaseModel
from typing import List, Optional


class CampBase(BaseModel):
    name: str
    city: str

class CampResponse(CampBase):
    id: int

    class Config:
        from_attributes = True


class GroupBase(BaseModel):
    camp_id: int
    name: str
    description: Optional[str] = None

class GroupResponse(GroupBase):
    id: int

    class Config:
        from_attributes = True

# Schedule
class GroupScheduleBase(BaseModel):
    group_id: int
    weekday: int
    hour: int
    minute: int
    coach_id: int

class GroupScheduleResponse(GroupScheduleBase):
    id: int

    class Config:
        from_attributes = True