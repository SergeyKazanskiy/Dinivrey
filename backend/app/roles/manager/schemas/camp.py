from pydantic import BaseModel
from typing import List, Optional


class CampResponse(BaseModel):
    id: int
    name: str
    groups: int # number of groups
    students: int # number of all students

    class Config:
        from_attributes = True
        