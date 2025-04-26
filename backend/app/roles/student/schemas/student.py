from pydantic import BaseModel, Field
from typing import Optional


# Student
class StudentBase(BaseModel):
    photo: str
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    gender: str
    age: int = Field(None, ge=3, le=99)
    group_id: int
    
    model_config = {"from_attributes": True}  # Нужно для корректной работы model_validate


class StudentResponse(StudentBase):
    id: int

    class Config:
        from_attributes = True

# Test
class TestBase(BaseModel):
    student_id: int
    timestamp: int
    date: str
    speed: float
    stamina: float
    climbing: float
    evasion: float
    hiding: float

class TestResponse(TestBase):
    id: int

    class Config:
        from_attributes = True

# Game
class GameBase(BaseModel):
    student_id: int
    timestamp: int
    date: str
    caughted: float
    freeded: float
    description: str

class GameResponse(GameBase):
    id: int

    class Config:
        from_attributes = True

# Achievement   
class AchievementResponse(BaseModel):
    image: str
    name: str
    level: str
    effect: str
        
    class Config:
        from_attributes = True

class AchieveResponse(BaseModel):
    id: int
    image: str
    name: str
    in_profile: str
    category: str
    level: str
        
    class Config:
        from_attributes = True

class AchieveUpdate(BaseModel):
    in_profile: bool
