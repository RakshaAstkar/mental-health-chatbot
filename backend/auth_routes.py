# backend/routes/auth_routes.py

from fastapi import APIRouter, HTTPException, Depends, Form
from passlib.context import CryptContext
from pymongo import MongoClient
from backend.auth import create_access_token

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["mental_health_db"]
users_collection = db["users"]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/token")
def login(username: str = Form(...), password: str = Form(...)):
    user = users_collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username")
    if not pwd_context.verify(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")
    access_token = create_access_token(data={"sub": username})
    return {"access_token": access_token, "token_type": "bearer"}
