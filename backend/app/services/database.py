from pymongo import MongoClient
import os

# Connect to MongoDB (default URI)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)

# Access database and collection
db = client["mental_health_db"]
users_collection = db["users"]
