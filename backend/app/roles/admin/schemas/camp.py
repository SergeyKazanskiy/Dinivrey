from pydantic import BaseModel
from typing import List, Optional


class CampBase(BaseModel):
    name: str
    city: str

class CampCreate(CampBase):
    pass

class CampUpdate(BaseModel):
    name: Optional[str] = None
    city: Optional[str] = None

class CampResponse(CampBase):
    id: int

    class Config:
        from_attributes = True
        

class CampScheduleResponse(BaseModel):
    id: int
    weekday: int
    time: str
    group: str
    coach: str        