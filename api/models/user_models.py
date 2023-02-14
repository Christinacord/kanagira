from pydantic import BaseModel

class User(BaseModel):
    id: int
    username: str
    email: str
    hashed_password: str

class UserIn(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
