from pydantic import BaseModel
from typing import List, Optional
from .student import StudentShort

class GroupBase(BaseModel):
    name: str
    description: Optional[str] = None
    camp_id: int

class GroupCreate(GroupBase):
    pass

class GroupUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class Group_Students(GroupBase):
    id: int
    students: Optional[List[StudentShort]] = []

    class Config:
        from_attributes = True

class GroupResponse(GroupBase):
    id: int

    class Config:
        from_attributes = True