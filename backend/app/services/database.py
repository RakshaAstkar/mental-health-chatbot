# filepath: backend/database.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/mental_health_db")

# Create a MongoDB client
client = MongoClient(MONGO_URI)

# Access the database
db = client.get_database()

# Example: Access a collection
users_collection = db["users"]

if __name__ == "__main__":
    try:
        print("Databases:", client.list_database_names())
        print("Connected to MongoDB successfully!")
    except Exception as e:
        print("Error connecting to MongoDB:", e)
