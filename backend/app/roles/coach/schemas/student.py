from pydantic import BaseModel, Field
from typing import Optional


# Student
class StudentBase(BaseModel):
    photo: str
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    gender: str
    age: int = Field(None, ge=3, le=99)
    active: bool
    group_id: int
    group_extra_id: Optional[int]
    city: Optional[str] = None
    street: Optional[str] = None
    house: Optional[str] = None
    model_config = {"from_attributes": True}  # Нужно для корректной работы model_validate


class StudentResponse(StudentBase):
    id: int

    class Config:
        from_attributes = True

class ParentResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str

class StudentName(BaseModel):
    first_name: str
    last_name: str

    class Config:
        from_attributes = True

class Tester(BaseModel):
    id: int
    first_name: str
    last_name: str

    test_id: int
    speed: float
    stamina: float
    climbing: float
    evasion: float
    hiding: float

    class Config:
            from_attributes = True

# Test
class TestBase(BaseModel):
    timestamp: int
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
    timestamp: int
    caughted: float
    freeded: float
    #description: str

class GameResponse(GameBase):
    id: int

    class Config:
        from_attributes = True

# Achievement   
class AchievementResponse(BaseModel):
    id: int;
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
    in_profile: bool
    category: str
    level: str
    effect: str
        
    class Config:
        from_attributes = True

class AchieveUpdate(BaseModel):
    in_profile: bool
