from pydantic import BaseModel
from typing import Optional, List


class EventBase(BaseModel):
    camp_id: int
    timestamp: int
    type: str
    desc: Optional[str] = None
    group1_id: int
    group2_id: Optional[int] = None
    # group1_report: bool
    # group2_report: bool

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    timestamp: Optional[int] = None
    type: Optional[str] = None
    desc: Optional[str] = None
    group1_id: Optional[int] = None
    group2_id: Optional[int] = None
    group1_report: Optional[bool] = None
    group2_report: Optional[bool] = None

class EventResponse(EventBase):
    id: int

    class Config:
        from_attributes = True

class EventReportResponse(BaseModel):
    is_report: bool #group1_report || group2_report


class GroupEventsResponse(BaseModel):
    id: int
    timestamp: int
    type: str
    desc: str
    amound: int
    

class AttendanceResponse(BaseModel):
    id: int
    student_id: int
    first_name: str
    last_name: str
    present: bool
    comment: str

    class Config:
        from_attributes = True

