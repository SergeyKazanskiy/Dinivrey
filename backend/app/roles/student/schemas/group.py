from pydantic import BaseModel
from typing import List, Optional


class GroupBase(BaseModel):
    camp_id: int
    name: str
    description: Optional[str] = None

class GroupResponse(GroupBase):
    id: int

    class Config:
        from_attributes = True