from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client["mental_health_db"]
chats_collection = db["chats"]

def save_message(username: str, sender: str, message: str):
    chat_entry = {
        "username": username,
        "sender": sender,
        "message": message,
        "timestamp": datetime.utcnow()
    }
    chats_collection.insert_one(chat_entry)

def get_chat_history(username: str):
    return list(chats_collection.find({"username": username}, {"_id": 0}))