from pydantic import BaseModel
from typing import Optional


class MetricBase(BaseModel):
    camp_id: int = 0
    test: str = ""
    start: int = 0
    stop: int = 0
    score: int = 0

class MetricCreate(BaseModel):
    camp_id: int
    test: str

class MetricResponse(MetricBase):
    id: int

class MetricUpdate(BaseModel):
    start: Optional[int] = None
    stop: Optional[int] = None

    class Config:
        from_attributes = True
