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
    summary_tests: str
    summary_achievements: str
    summary_games: str
    model_config = {"from_attributes": True}  # Нужно для корректной работы model_validate


class StudentResponse(StudentBase):
    id: int

    class Config:
        from_attributes = True

class StudentShort(BaseModel):
    id: int
    photo: str
    first_name: str
    last_name: str
    gender: str
    age: int
    active: bool

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

    speed_time: int
    stamina_time: float
    climbing_time: int

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

    speed_time: int
    stamina_time: float
    climbing_time: int

class TestCreate(TestBase):
    pass

class TestResponse(TestBase):
    id: int
    
    class Config:
        from_attributes = True

class TestUpdate(BaseModel):
    speed: Optional[float] = None
    stamina: Optional[float] = None
    climbing: Optional[float] = None
    evasion: Optional[float] = None
    hiding: Optional[float] = None

    speed_time: Optional[float] = None
    stamina_time: Optional[float] = None
    climbing_time: Optional[float] = None

class TestUpdate2(BaseModel):
    exam: str
    value: float
    camp_id: int

# Game
class GameBase(BaseModel):
    timestamp: int
    caughted: float
    freeded: float
    #description: str

class GameCreate(GameBase):
    pass

class GameResponse(GameBase):
    id: int

    class Config:
        from_attributes = True

# Achievement
class AchievementBase(BaseModel):
    student_id: int
    achieve_id: int
    in_profile: bool
    level: str

class AchievementCreate(AchievementBase):
    pass
 
class AchievementResponse(BaseModel):
    id: int;
    image: str
    name: str
    effect: str
        
    class Config:
        from_attributes = True

class AchieveResponse(BaseModel):
    id: int
    achieve_id: int
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

#Summary
class SummaryTests(BaseModel):
    summary_tests: str

class SummaryAchievements(BaseModel):
    summary_achievements: str

class SummaryGames(BaseModel):
    summary_games: str        

#Comment from coach
class CommentResponse(BaseModel):
    timestamp: int
    comment: str