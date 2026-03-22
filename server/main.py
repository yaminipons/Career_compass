from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")

from routes.auth import router as auth_router
from routes.profile import router as profile_router
from routes.careers import router as careers_router
from routes.skillgap import router as skillgap_router
from routes.chatbot import router as chatbot_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://career-compass-ochre-delta.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(profile_router, prefix="/profile")
app.include_router(careers_router, prefix="/careers")
app.include_router(skillgap_router, prefix="/skillgap")
app.include_router(chatbot_router, prefix="/chatbot")

@app.get("/")
def home():
    return {"message": "Career Advisor API is running!"}