from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class CoachBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    active: bool = True
    signature: Optional[str]
    camp_id: int

class CoachCreate(CoachBase):
    pass

class CoachUpdate(CoachBase):
    pass

class CoachResponse(CoachBase):
    id: int

    class Config:
        from_attributes = True


class CoachGroupBase(BaseModel):
    coache_id: int
    group_id: int

class CoachGroupCreate(CoachGroupBase):
    pass

class CoachGroupResponse(CoachGroupBase):
    id: int

    class Config:
        from_attributes = True


class CoachGroup(BaseModel):
    id: int
    coache_id: int
    name: str 
    desc: str

class CoachSchedule(BaseModel):
    coache_id: int
    weekday: str 
    groups: str

class CoachEvent(BaseModel):
    timestamp: int
    desc: str
    group1_id: int
    group2_id: int
    group1: str 
    group2: str

