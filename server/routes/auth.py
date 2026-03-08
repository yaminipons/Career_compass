from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import users_collection
import bcrypt
import os
from jose import jwt
from dotenv import load_dotenv
from pathlib import Path

# Load .env explicitly
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

router = APIRouter()
SECRET_KEY = os.getenv("SECRET_KEY")

# Temporary check - delete after fixing
print("SECRET KEY IS:", SECRET_KEY)

# --- Models (what data we expect) ---
class RegisterUser(BaseModel):
    name: str
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

# --- Register Route ---
@router.post("/register")
async def register(user: RegisterUser):
    # Check if email already exists
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password before saving
    hashed = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())

    # Save user to database
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed.decode("utf-8"),
        "stream": "",
        "interests": [],
        "skills": [],
        "marks": {"tenth": 0, "twelfth": 0}
    }
    await users_collection.insert_one(new_user)

    return {"message": "Account created successfully!"}

# --- Login Route ---
@router.post("/login")
async def login(user: LoginUser):
    # Find user in database
    found = await users_collection.find_one({"email": user.email})
    if not found:
        raise HTTPException(status_code=400, detail="Email not found")

    # Check password
    valid = bcrypt.checkpw(user.password.encode("utf-8"), found["password"].encode("utf-8"))
    if not valid:
        raise HTTPException(status_code=400, detail="Wrong password")

    # Create a JWT token
    token = jwt.encode({"id": str(found["_id"]), "email": found["email"]}, SECRET_KEY, algorithm="HS256")

    return {"token": token, "name": found["name"]}