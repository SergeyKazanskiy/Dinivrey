from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class StudentBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    age: int = Field(..., ge=1, le=100)
    gender: str = Field(..., regex="^(male|female|other)$")
    child_gender: Optional[str] = Field(None, regex="^(male|female|other)$")
    phone: str = Field(..., regex="^\\+?[0-9]{7,15}$")
    group_id: int

class StudentCreate(StudentBase):
    pass

class StudentUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    last_name: Optional[str] = Field(None, min_length=2, max_length=50)
    email: Optional[EmailStr] = None
    age: Optional[int] = Field(None, ge=1, le=100)
    gender: Optional[str] = Field(None, regex="^(male|female|other)$")
    phone: Optional[str] = Field(None, regex="^\\+?[0-9]{7,15}$")
    group_id: Optional[int] = None

class StudentResponse(StudentBase):
    id: int
    created_at: str
    updated_at: str
    
    class Config:
        from_attributes = True
