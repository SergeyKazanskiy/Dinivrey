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

class CoachResponse(CoachBase):
    id: int

    class Config:
        from_attributes = True

