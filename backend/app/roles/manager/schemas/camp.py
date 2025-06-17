from pydantic import BaseModel
from typing import List, Optional


class CampBase(BaseModel):
    name: str
    city: str

class CampResponse(CampBase):
    id: int

    class Config:
        from_attributes = True
        