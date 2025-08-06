from pydantic import BaseModel
from typing import List, Optional


class ManagerBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    camp_id: int

class ManagerCreate(ManagerBase):
    pass  

class ManagerUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
   

class ManagerResponse(ManagerBase):
    id: int

    class Config:
        from_attributes = True
