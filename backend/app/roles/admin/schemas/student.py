from pydantic import BaseModel, Field
from typing import Optional, List


# Student
class StudentBase(BaseModel):
    photo: str
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    gender: str
    age: int = Field(None, ge=3, le=99)
    phone: Optional[str]
    active: bool
    group_id: int
    group_extra_id: Optional[int]
    city: Optional[str]
    street: Optional[str]
    house: Optional[str]
    
    model_config = {"from_attributes": True}  # Нужно для корректной работы model_validate

class StudentCreate(BaseModel):
    group_id: int
    photo: str
    first_name: str
    last_name: str
    age: int
    gender: str
    active: bool

class StudentUpdate(BaseModel):
    photo: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    phone: Optional[str] = None
    active: Optional[bool] = None
    group_id: Optional[int] = None
    group_extra_id: Optional[int] = None
    city: Optional[str] = None
    street: Optional[str] = None
    house: Optional[str] = None

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

class StudentName(BaseModel):
    first_name: str
    last_name: str

    class Config:
        from_attributes = True

# Parent
class ParentBase(BaseModel):
    student_id: int
    name: str
    email: str
    phone: str

class ParentCreate(ParentBase):
    pass

class ParentUpdate(BaseModel):
    id: int
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

class ParentResponse(ParentBase):
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

class TestCreate(TestBase):
    pass

class TestUpdate(BaseModel):
    speed: Optional[float] = None
    stamina: Optional[float] = None
    climbing: Optional[float] = None
    evasion: Optional[float] = None
    hiding: Optional[float] = None

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

class GameCreate(GameBase):
    pass

class GameUpdate(BaseModel):
    caughted: Optional[float] = None
    freeded: Optional[float] = None
    description: Optional[str] = None

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
     
class AchievementUpdate(BaseModel):
    in_profile: bool

class AchievementResponse(BaseModel):
    id: int
    category: str
    name: str
    image: str
    level: str
    in_profile: str
    effect: str
    trigger: str
    desc: str
        
    class Config:
        from_attributes = True


class StudentTestLider(BaseModel):
    id: int
    photo: Optional[str]
    first_name: str
    last_name: str
    group_name: str

    speed: float
    stamina: float
    climbing: float
    evasion: float
    hiding: float


class StudentAchieve(BaseModel):
    id: int
    image: str
    name: str
    level: str

class StudentAchieveLider(BaseModel):
    id: int
    photo: str
    first_name: str
    last_name: str
    achieves: List[StudentAchieve]

