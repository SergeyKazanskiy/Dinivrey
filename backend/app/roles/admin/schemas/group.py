from pydantic import BaseModel
from typing import List, Optional
from .student import StudentShort

class GroupBase(BaseModel):
    name: str
    description: Optional[str] = None
    camp_id: int

class GroupCreate(GroupBase):
    pass

class GroupUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class Group_Students(GroupBase):
    id: int
    students: Optional[List[StudentShort]] = []

    class Config:
        from_attributes = True

class GroupResponse(GroupBase):
    id: int

    class Config:
        from_attributes = True


class GroupScheduleBase(BaseModel):
    group_id: int
    weekday: int
    hour: int
    minute: int

class GroupScheduleCreate(GroupScheduleBase):
    pass

class GroupScheduleUpdate(BaseModel):
    hour: Optional[int] = None
    minute: Optional[int] = None
    coach_id: Optional[int] = None 

class GroupScheduleRead(GroupScheduleBase):
    id: int

    class Config:
        from_attributes = True

class GroupReadWithSchedule(BaseModel):
    id: int
    name: str
    schedule: List[GroupScheduleRead]

    class Config:
        from_attributes = True


class GroupCoachUpdate(BaseModel):
    coach_id: int

class FreeGroupResponse(BaseModel):
    camp_name: str
    id: int
    name: str
    desc: str    