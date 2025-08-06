from pydantic import BaseModel

class ResponseOk(BaseModel):
    isOk: bool

class ResponseId(BaseModel):
    id: int

class StudentBase(BaseModel):
    name: str

class StudentCreate(StudentBase):
    pass

class StudentUpdate(StudentBase):
    pass

class StudentInDB(StudentBase):
    id: int

    class Config:
        from_attributes = True

class RoleBase(BaseModel):
    role: str