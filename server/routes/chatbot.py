from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import google.generativeai as genai
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

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
- Always end with an encouraging note or a follow-up question to keep the conversation going
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
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=SYSTEM_PROMPT
        )

        # Build chat history for context
        history = []
        for msg in request.history[-10:]:  # last 10 messages for context
            history.append({
                "role": "user" if msg.role == "user" else "model",
                "parts": [msg.content]
            })

        chat_session = model.start_chat(history=history)
        response = chat_session.send_message(request.message)

        return {"reply": response.text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))