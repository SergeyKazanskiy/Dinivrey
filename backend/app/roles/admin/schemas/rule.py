from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class RuleBase(BaseModel):
    achieve_id: int
    level: int
    parameter: str
    condition: str
    value: float
    type: str
    selection: str
               
class RuleCreate(RuleBase):
    pass

class RuleUpdate(RuleBase):
    pass

class RuleResponse(RuleBase):
    id: int

    class Config:
        from_attributes = True

