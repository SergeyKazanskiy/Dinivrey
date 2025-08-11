from pydantic import BaseModel
from typing import List, Optional


class GroupBase(BaseModel):
    camp_id: int
    name: str
    description: Optional[str] = None

class GroupResponse(GroupBase):
    id: int
    camp_name: str
    
    class Config:
        from_attributes = True


class GroupScheduleBase(BaseModel):
    group_id: int
    weekday: int
    hour: int
    minute: int

class GroupScheduleResponse(GroupScheduleBase):
    id: int

    class Config:
        from_attributes = True



class StudentShort(BaseModel):
    id: int
    photo: str
    first_name: str
    last_name: str
    gender: str
    age: int
    active: bool

    class Config:
        from_attributes = True

class StudentAvgScore(BaseModel):
    id: int
    photo: str
    first_name: str
    last_name: str
    gender: str
    age: int
    active: bool
    test_avg: float
