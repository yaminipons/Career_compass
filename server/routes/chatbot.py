from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv
from pathlib import Path
from groq import Groq

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

router = APIRouter()

SYSTEM_PROMPT = """You are CareerBot, an expert AI Career Mentor built into CareerCompass — a career guidance platform for Indian students.

Your role is to:
1. Help students discover the right career path based on their interests and skills
2. Suggest specific skills to learn for any career
3. Recommend free and paid courses, certifications and resources
4. Suggest beginner to advanced project ideas to build a portfolio
5. Guide students on entrance exams like JEE, NEET, CAT, CLAT, UPSC, GATE
6. Give honest salary expectations and job market insights for India
7. Help with career switches and roadmaps

Your personality:
- Friendly, encouraging and mentor-like
- Give specific actionable advice, not vague answers
- Always relate to the Indian job market and education system
- Use examples relevant to Indian students
- Keep responses concise but complete
- Use bullet points and emojis to make responses readable

Important rules:
- Only answer career, education, skills and professional development questions
- If asked something unrelated, politely redirect to career topics
- Always end with an encouraging note or a follow-up question
- Never give medical, legal or financial investment advice"""


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: List[Message] = []


@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))

        # Build conversation history
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Add last 10 messages for context
        for msg in request.history[-10:]:
            messages.append({
                "role": msg.role if msg.role == "user" else "assistant",
                "content": msg.content
            })

        # Add current message
        messages.append({
            "role": "user",
            "content": request.message
        })

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=1000,
            temperature=0.7
        )

        return {"reply": response.choices[0].message.content}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))