from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class RuleBase(BaseModel):
    achieve_id: int
    level: int # 1 - 5
    parameter: str # Exam, Game or Event table fields
    condition: str # "<" | "=" | ">"
    value: float
    type: str # "AND" | "OR" only for level (раньше был "Common" | "Personal" | "Cumulative")
    selection: str # "Current" | "Max" | "Summ" | "Count"
               
class RuleCreate(RuleBase):
    pass

class RuleUpdate(RuleBase):
    pass

class RuleResponse(RuleBase):
    id: int

    class Config:
        from_attributes = True

