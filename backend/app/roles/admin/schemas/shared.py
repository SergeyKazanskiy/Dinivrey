from pydantic import BaseModel
from typing import List, Optional


class ResponseOk(BaseModel):
    isOk: bool
    error_code: Optional[int] = None
    error_message: Optional[str] = None
    

class ResponseId(BaseModel):
    id: int
