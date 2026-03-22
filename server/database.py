import motor.motor_asyncio
import os
from dotenv import load_dotenv
from pathlib import Path
import ssl
import certifi

load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")

MONGO_URL = os.getenv("MONGO_URL")

# Create SSL context using certifi certificates
ssl_context = ssl.create_default_context(cafile=certifi.where())
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

client = motor.motor_asyncio.AsyncIOMotorClient(
    MONGO_URL,
    tls=True,
    tlsAllowInvalidCertificates=True,
    ssl_context=ssl_context
)

database = client.career_advisor

users_collection = database.get_collection("users")
careers_collection = database.get_collection("careers")