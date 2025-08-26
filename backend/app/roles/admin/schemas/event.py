from pydantic import BaseModel
from typing import Optional


class EventBase(BaseModel):
    camp_id: int
    timestamp: int
    duration: int
    type: str
    desc: Optional[str] = None
    group1_id: int
    group2_id: Optional[int] = None
    
class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    timestamp: Optional[int] = None
    duration: Optional[int] = None
    type: Optional[str] = None
    desc: Optional[str] = None
    group1_id: Optional[int] = None
    group2_id: Optional[int] = None

class EventResponse(EventBase):
    id: int

    class Config:
        from_attributes = True


class AttendanceBase(BaseModel):
    event_id: int
    group_id: int
    student_id: int
    present: bool

class AttendanceDataCreate(BaseModel):
    event_id: int
    group_id: int

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceUpdate(BaseModel):
    present: bool
    student_id: Optional[int] = None

class AttendanceResponse(BaseModel):
    id: int
    student_id: int
    first_name: str
    last_name: str
    present: bool

    class Config:
        from_attributes = True

class AttendancePercent(BaseModel):
    Training: int
    Exam: int
    Game: int