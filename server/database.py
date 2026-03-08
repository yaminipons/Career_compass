import motor.motor_asyncio
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")

MONGO_URL = os.getenv("MONGO_URL")

client = motor.motor_asyncio.AsyncIOMotorClient(
    MONGO_URL,
    tls=True,
    tlsAllowInvalidCertificates=True
)

database = client.career_advisor

users_collection = database.get_collection("users")
careers_collection = database.get_collection("careers")