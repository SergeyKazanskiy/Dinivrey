from pydantic import BaseModel
from typing import List

class StudentBase(BaseModel):
    name: str

class StudentCreate(StudentBase):
    pass

class StudentResponse(StudentBase):
    id: int
    group_id: int
    
    class Config:
        from_attributes = True

class GroupBase(BaseModel):
    name: str

class GroupCreate(GroupBase):
    pass

class GroupResponse(GroupBase):
    id: int
    students: List[StudentResponse] = []

    class Config:
        from_attributes = True
