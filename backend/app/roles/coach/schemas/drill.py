from pydantic import BaseModel
from typing import List, Optional


class EventDrillBase(BaseModel):
    event_id: int
    drill_id: int
    completed: bool

class EventDrillCreate(EventDrillBase):
    pass

class EventDrillUpdate(BaseModel):
    completed: bool

class ShortDrillResponse(BaseModel):
    id: int
    category: str
    name: str
    time: str
    actors: int
    level: str
    
    class Config:
        from_attributes = True


class DrillResponse(BaseModel):
    id: int
    name: str
    time: str
    level: str
    link: str
    desc: str
    category: str
    actors: int

    class Config:
        from_attributes = True