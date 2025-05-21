from pydantic import BaseModel
from typing import Optional


#Drill
class DrillCreate(BaseModel):
    name: str
    time: str
    level: str

class DrillUpdate(BaseModel):
    name: Optional[str] = None
    time: Optional[str] = None
    level: Optional[str] = None
    link: Optional[str] = None
    desc: Optional[str] = None

class DrillResponse(BaseModel):
    id: int
    name: str
    time: str
    level: str
    link: str
    desc: str

    class Config:
        from_attributes = True


#EventDrill
class EventDrillBase(BaseModel):
    event_id: int
    drill_id: int
    completed: bool = False

class EventDrillCreate(EventDrillBase):
    pass

class EventDrillUpdate(BaseModel):
    completed: bool

class EventDrillResponse(EventDrillBase):
    id: int

    class Config:
        from_attributes = True