from pydantic import BaseModel
from typing import List, Optional


class EventDrillBase(BaseModel):
    event_id: int
    drill_id: int
    completed: bool

class EventDrillCreate(EventDrillBase):
    pass


class ShortDrillResponse(BaseModel):
    id: int
    name: str
    time: str
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

    class Config:
        from_attributes = True