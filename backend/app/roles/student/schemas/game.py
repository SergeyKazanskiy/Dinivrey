from pydantic import BaseModel
from typing import Optional

# Game
class GameBase(BaseModel):
    event_id: int
    group_id: int
    timestamp: int
    first_team: str
    time1: int
    time2: int
    points1: int
    points2: int
    tags: int
    rescues: int
    winner: str
    presence: str

class GameResponse(GameBase):
    id: int

    class Config:
        from_attributes = True

# Gamer
class GamerBase(BaseModel):
    game_id: int
    student_id: int
    name: str
    team: str
    caught: int
    freeded: int
    is_survived: bool

class GamerResponse(GamerBase):
    id: int

    class Config:
        from_attributes = True
