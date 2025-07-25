from pydantic import BaseModel
from typing import Optional


class GameBase(BaseModel):
    event_id: int
    group_id: int
    timestamp: int
    first_team: str
    time1: int
    time2: int
    points: int
    tags: int
    rescues: int
    winner: str

class GameCreate(GameBase):
    pass

class GameResponse(GameBase):
    id: int

    class Config:
        from_attributes = True


class GamerBase(BaseModel):
    game_id: int
    student_id: int
    name: str
    team: str
    caught: int
    freeded: int
    is_survived: bool

class GamerCreate(GamerBase):
    pass


class GamerResponse(GamerBase):
    id: int

    class Config:
        from_attributes = True
