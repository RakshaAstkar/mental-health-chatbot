# backend/create_test_user.py

import bcrypt
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["mental_health_db"]
users_collection = db["users"]

# Replace or update user
username = "testuser"
password = "password123"
hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

users_collection.update_one(
    {"username": username},
    {"$set": {"username": username, "password": hashed_pw.decode('utf-8')}},
    upsert=True
)

print("✅ User inserted successfully")
