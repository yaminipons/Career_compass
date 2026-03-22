from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from database import careers_collection
from bson import ObjectId

router = APIRouter()

class SkillGapRequest(BaseModel):
    career_id: str
    user_skills: List[str]

resources = {
    "Python": ["Python for Everybody - Coursera", "Automate the Boring Stuff - free book", "freeCodeCamp Python"],
    "SQL": ["SQLZoo - free", "Mode SQL Tutorial", "Khan Academy SQL"],
    "Machine Learning": ["Andrew Ng ML Course - Coursera", "Fast.ai - free", "Google ML Crash Course"],
    "TensorFlow": ["TensorFlow official tutorials", "DeepLearning.AI TensorFlow - Coursera"],
    "Statistics": ["Khan Academy Statistics", "StatQuest YouTube", "Think Stats - free book"],
    "JavaScript": ["The Odin Project - free", "JavaScript.info - free", "freeCodeCamp JS"],
    "React": ["React official docs", "Scrimba React Course", "freeCodeCamp React"],
    "DSA": ["DSA by Abdul Bari - YouTube", "LeetCode", "GeeksForGeeks DSA"],
    "Excel": ["Excel Easy - free", "Microsoft Excel Training", "Chandoo.org"],
    "Power BI": ["Microsoft Power BI Learning", "Guy in a Cube - YouTube"],
    "AWS": ["AWS Free Tier + official docs", "AWS Cloud Practitioner - Coursera"],
    "Docker": ["Docker official docs", "TechWorld with Nana - YouTube"],
    "Linux": ["Linux Journey - free", "The Linux Command Line - free book"],
    "Figma": ["Figma official tutorials", "DesignCourse YouTube"],
    "AutoCAD": ["AutoCAD official tutorials", "LinkedIn Learning AutoCAD"],
    "Communication": ["Toastmasters", "Coursera Communication Skills"],
    "Accounting": ["AccountingCoach - free", "Coursera Financial Accounting"],
    "Financial Modeling": ["CFI Financial Modeling - free", "Wall Street Prep"],
    "Biology": ["Khan Academy Biology", "Coursera Biology Specialization"],
    "Chemistry": ["Khan Academy Chemistry", "MIT OpenCourseWare Chemistry"],
}

def get_resources(skill: str) -> List[str]:
    for key in resources:
        if key.lower() == skill.lower():
            return resources[key]
    return ["Google the skill + 'free course'", "YouTube tutorials", "Coursera / Udemy"]

@router.post("/analyze")
async def analyze_skill_gap(data: SkillGapRequest):
    # Try by ObjectId first, fallback to title search
    career = None
    try:
        career = await careers_collection.find_one({"_id": ObjectId(data.career_id)})
    except Exception:
        pass
    
    if not career:
        career = await careers_collection.find_one({"title": data.career_id})
    
    if not career:
        return {"error": "Career not found"}

    required = [s.lower() for s in career["required_skills"]]
    user = [s.lower() for s in data.user_skills]

    matched = [s for s in required if s in user]
    missing = [s for s in required if s not in user]

    match_percent = round((len(matched) / len(required)) * 100) if required else 0

    recommendations = []
    for skill in missing:
        original = next((s for s in career["required_skills"] if s.lower() == skill), skill)
        recommendations.append({
            "skill": original,
            "resources": get_resources(original)
        })

    return {
        "career": career["title"],
        "total_required": len(required),
        "matched_skills": [s for s in career["required_skills"] if s.lower() in user],
        "missing_skills": [s for s in career["required_skills"] if s.lower() not in user],
        "match_percentage": match_percent,
        "recommendations": recommendations
    }