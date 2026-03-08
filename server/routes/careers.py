from fastapi import APIRouter, HTTPException, Header
from database import users_collection, careers_collection
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

# --- Scoring logic ---
def calculate_match(user, career):
    score = 0

    # Stream match — 30 points
    if user.get("stream") in career.get("streams", []):
        score += 30

    # Skills overlap — 40 points
    user_skills = set(s.lower() for s in user.get("skills", []))
    career_skills = set(s.lower() for s in career.get("required_skills", []))
    if career_skills:
        matched = user_skills & career_skills
        score += (len(matched) / len(career_skills)) * 40

    # Interest match — 30 points
    user_interests = set(i.lower() for i in user.get("interests", []))
    career_tags = set(t.lower() for t in career.get("tags", []))
    if user_interests & career_tags:
        score += 30

    return round(score)

# --- Get recommendations ---
@router.get("/recommend")
async def recommend(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user_id = get_user_id(token)

    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    all_careers = await careers_collection.find().to_list(100)

    results = []
    for career in all_careers:
        score = calculate_match(user, career)
        results.append({
            "id": str(career["_id"]),
            "title": career["title"],
            "tags": career.get("tags", []),
            "required_skills": career.get("required_skills", []),
            "top_courses": career.get("top_courses", []),
            "certifications": career.get("certifications", []),
            "avg_salary": career.get("avg_salary", ""),
            "top_colleges": career.get("top_colleges", []),
            "job_outlook": career.get("job_outlook", ""),
            "match_score": score
        })

    # Sort by score highest first
    results.sort(key=lambda x: x["match_score"], reverse=True)

    return {
        "best_matches": results[:5],
        "explore_more": results[5:]
    }

# --- Get single career detail ---
@router.get("/{career_id}")
async def get_career(career_id: str):
    career = await careers_collection.find_one({"_id": ObjectId(career_id)})
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    return {
        "id": str(career["_id"]),
        "title": career["title"],
        "tags": career.get("tags", []),
        "streams": career.get("streams", []),
        "required_skills": career.get("required_skills", []),
        "top_courses": career.get("top_courses", []),
        "certifications": career.get("certifications", []),
        "avg_salary": career.get("avg_salary", ""),
        "top_colleges": career.get("top_colleges", []),
        "job_outlook": career.get("job_outlook", "")
    }