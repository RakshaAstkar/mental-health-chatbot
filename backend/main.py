from fastapi import FastAPI, Depends, HTTPException, WebSocket
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
import openai
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from backend.app.services.ai.chat_processing import generate_response

load_dotenv()

# App configuration
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secret key and algorithm for JWT
SECRET_KEY = "0f560476562ed6ec4208ff81558881d9710d1970cd7a9452ba3d68ea3dbcdc66"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Predefined user database
fake_users_db = {
    "testuser": {
        "username": "testuser",
        "hashed_password": bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
    },
}

# Authenticate user
def authenticate_user(username: str, password: str):
    user = fake_users_db.get(username)
    if not user or not bcrypt.checkpw(password.encode(), user["hashed_password"].encode()):
        return None
    return user

# Create access token
def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# Login endpoint
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    print(f"Login attempt: username={form_data.username}, password={form_data.password}")
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    access_token = create_access_token(data={"sub": user["username"]})
    print(f"Generated token: {access_token}")
    return {"access_token": access_token, "token_type": "bearer"}

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Mental Health Chatbot API"}

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    print(f"Received request with method: POST")  # Debugging log
    print(f"Received message: {request.message}")  # Debugging log
    try:
        bot_reply = await generate_response(request.message)
        print(f"Bot reply: {bot_reply}")  # Debugging log
        return {"reply": bot_reply}
    except Exception as e:
        print(f"Error in /chat endpoint: {e}")  # Debugging log
        raise HTTPException(status_code=500, detail="An error occurred while processing your request.")

@app.get("/chat")
async def chat_debug():
    return {"message": "This endpoint only supports POST requests. Please send a POST request to /chat."}

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message received: {data}")

async def generate_response(message: str) -> str:
    print(f"API call for message: {message}")  # Log each API call
    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",  # Use gpt-3.5-turbo or gpt-4
            messages=[
                {"role": "system", "content": "You are a supportive mental health assistant."},
                {"role": "user", "content": message}
            ]
        )
        print(f"Full API response: {response}")  # Log the full API response
        bot_reply = response['choices'][0]['message']['content']
        print(f"Extracted bot reply: {bot_reply}")  # Log the extracted reply
        return bot_reply
    except Exception as e:
        print(f"Error in generate_response: {e}")  # Log any errors
        return "An error occurred while processing your request."