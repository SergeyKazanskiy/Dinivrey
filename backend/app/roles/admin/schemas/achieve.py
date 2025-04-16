from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class AchieveBase(BaseModel):
    image: str
    name: str
    desc: Optional[str] = None
    hasRules: bool
    category: str
    trigger: str
    effect: str
                    
class AchieveCreate(AchieveBase):
    pass

class AchieveUpdate(AchieveBase):
    pass

class AchieveResponse(AchieveBase):
    id: int

    class Config:
        from_attributes = True


class AchieveShortResponse(BaseModel):
    id: int
    image: str
    name: str
    category: str
    
    class Config:
        from_attributes = True

