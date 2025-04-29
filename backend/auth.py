from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

# Secret key and algorithm for JWT encoding/decoding
SECRET_KEY = "0f560476562ed6ec4208ff81558881d9710d1970cd7a9452ba3d68ea3dbcdc66"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory user storage for demonstration (replace with a database in production)
fake_users_db = {
    "testuser": {
        "username": "testuser",
        "hashed_password": pwd_context.hash("password123"),
    },
}

# User model
class User(BaseModel):
    username: str
    password: str

# Verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    print(f"Verifying password: {plain_password} against {hashed_password}")  # Debugging
    return pwd_context.verify(plain_password, hashed_password)

# Authenticate user
def authenticate_user(username: str, password: str) -> Optional[dict]:
    print(f"Authenticating user: {username}")  # Debugging
    user = fake_users_db.get(username)
    if not user:
        print("User not found")  # Debugging
        return None
    if not verify_password(password, user["hashed_password"]):
        print("Password mismatch")  # Debugging
        return None
    print("User authenticated successfully")  # Debugging
    return user

# Create access token (JWT)
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Decode access token
def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload["exp"] < datetime.utcnow().timestamp():
            print("Token expired")  # Debugging
            return None
        return payload
    except JWTError as e:
        print(f"Token decoding error: {e}")  # Debugging
        return None