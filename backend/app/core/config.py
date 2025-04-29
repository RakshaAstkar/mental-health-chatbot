from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access the variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_URI")
SECRET_KEY = os.getenv("SECRET_KEY")