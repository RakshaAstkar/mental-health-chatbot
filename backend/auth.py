from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
# In your auth.py
import bcrypt

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

# Secret key and algorithm for JWT encoding/decoding
SECRET_KEY = "0f560476562ed6ec4208ff81558881d9710d1970cd7a9452ba3d68ea3dbcdc66"  # Replace with a secure secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Token expiration time (in minutes)

# Initialize password context for hashing and verification
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Sample User model
class User(BaseModel):
    username: str
    password: str

# In-memory user storage for demonstration (replace with a database in production)
fake_users_db = {
    "testuser": {
        "username": "testuser",
        "hashed_password": pwd_context.hash("password123"),  # Password hashed for security
    },
}

# Function to verify the user's password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Adding debug print to check if password comparison is correct
    print(f"Verifying password: {plain_password} against {hashed_password}")  # Debugging line
    return pwd_context.verify(plain_password, hashed_password)

# Function to authenticate the user
def authenticate_user(username: str, password: str) -> Optional[User]:
    print(f"Attempting to authenticate user: {username}")  # Debugging line
    user = fake_users_db.get(username)
    if not user:
        print(f"User {username} not found")  # Debugging line
        return None

    # Print out the hashed password for comparison
    print(f"Stored hashed password for {username}: {user['hashed_password']}")  # Debugging line

    if not verify_password(password, user["hashed_password"]):
        print(f"Password mismatch for {username}")  # Debugging line
        return None

    print(f"User {username} authenticated successfully")  # Debugging line
    return User(username=username, password=user["hashed_password"])

# Function to create an access token (JWT)
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Example function to decode the JWT and get the user info
def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload if payload["exp"] >= datetime.utcnow() else None
    except JWTError:
        return None
