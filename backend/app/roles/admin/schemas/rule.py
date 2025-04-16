from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class RuleBase(BaseModel):
    level: str
    parameter: str
    condition: str
    value: float
    isPersonal: bool
    selection: str
    achieve_id: int
                    
class RuleCreate(RuleBase):
    pass

class RuleUpdate(RuleBase):
    pass

class RuleResponse(RuleBase):
    pass

    class Config:
        from_attributes = True

