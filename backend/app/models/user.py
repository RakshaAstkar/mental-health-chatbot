from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: EmailStr
    hashed_password: str
    name: str = "Anonymous"
