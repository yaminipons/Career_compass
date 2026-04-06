from fastapi import APIRouter, UploadFile, File, HTTPException
from groq import Groq
import os
import fitz  # PyMuPDF
import docx
import tempfile
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

router = APIRouter()

RESUME_PROMPT = """You are an expert Resume Analyzer and Career Coach with 15+ years of experience reviewing resumes for top companies in India and globally.

Analyze the resume text provided and give a detailed evaluation in the following EXACT JSON format (respond with JSON only, no extra text):

{
  "score": <number between 0-100>,
  "score_breakdown": {
    "content": <0-25>,
    "skills": <0-25>,
    "structure": <0-25>,
    "impact": <0-25>
  },
  "strengths": [<list of 3-5 specific strengths found in the resume>],
  "weaknesses": [<list of 3-5 specific weaknesses or missing elements>],
  "missing_keywords": [<list of 8-12 important keywords/skills missing for their target role>],
  "improvement_suggestions": [<list of 5-7 specific actionable improvements>],
  "detected_skills": [<list of all skills found in the resume>],
  "experience_level": "<Fresher/Junior/Mid-Level/Senior>",
  "target_roles": [<list of 3-4 roles this resume is suitable for>],
  "quick_wins": [<list of 3 things they can fix immediately to improve score>]
}

Be specific, honest and constructive. Base your analysis on the actual content provided."""


def extract_text_from_pdf(file_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name
    try:
        doc = fitz.open(tmp_path)
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text.strip()
    finally:
        os.unlink(tmp_path)


def extract_text_from_docx(file_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name
    try:
        doc = docx.Document(tmp_path)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text.strip()
    finally:
        os.unlink(tmp_path)


@router.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")

    file_bytes = await file.read()

    # Check file size (max 5MB)
    if len(file_bytes) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be less than 5MB")

    # Extract text
    try:
        if file.filename.endswith('.pdf'):
            text = extract_text_from_pdf(file_bytes)
        else:
            text = extract_text_from_docx(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to extract text: {str(e)}")

    if len(text.strip()) < 50:
        raise HTTPException(status_code=400, detail="Could not extract enough text from the file. Make sure it's not a scanned image.")

    # Analyze with Groq
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": RESUME_PROMPT},
                {"role": "user", "content": f"Analyze this resume:\n\n{text[:4000]}"}
            ],
            max_tokens=2000,
            temperature=0.3
        )

        import json
        raw = response.choices[0].message.content
        # Clean up response in case of markdown code blocks
        raw = raw.replace("```json", "").replace("```", "").strip()
        result = json.loads(raw)
        return result

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI response parsing failed. Please try again.")
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))