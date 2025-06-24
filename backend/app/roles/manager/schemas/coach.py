from pydantic import BaseModel
from typing import List, Optional


class CoachBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    active: bool = True
    signature: Optional[str]
    camp_id: int

class CoachUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    active: Optional[bool] = None
    signature: Optional[str] = None
    camp_id: Optional[int] = None

class CoachResponse(CoachBase):
    id: int

    class Config:
        from_attributes = True


class CoachShortResponse(BaseModel):
    id: int
    first_name: str
    last_name: str


class CoachGroupResponse(BaseModel):
    id: int
    group_id: int
    name: str 
    desc: str

class CoachGroupBase(BaseModel):
    coache_id: int
    group_id: int
    

class CoachGroupAdd(CoachGroupBase):
    pass    