from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import List
from database import users_collection
from bson import ObjectId
import os
from jose import jwt
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

router = APIRouter()
SECRET_KEY = os.getenv("SECRET_KEY")

# --- Helper: Get user ID from token ---
def get_user_id(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload.get("id")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

# --- Model for updating profile ---
class ProfileUpdate(BaseModel):
    stream: str
    interests: List[str]
    skills: List[str]
    tenth: float
    twelfth: float

# --- Get profile ---
@router.get("/me")
async def get_profile(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user_id = get_user_id(token)

    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "name": user["name"],
        "email": user["email"],
        "stream": user.get("stream", ""),
        "interests": user.get("interests", []),
        "skills": user.get("skills", []),
        "marks": user.get("marks", {})
    }

# --- Update profile ---
@router.put("/update")
async def update_profile(data: ProfileUpdate, authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user_id = get_user_id(token)

    await users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {
            "stream": data.stream,
            "interests": data.interests,
            "skills": data.skills,
            "marks": {
                "tenth": data.tenth,
                "twelfth": data.twelfth
            }
        }}
    )
    return {"message": "Profile updated successfully!"}