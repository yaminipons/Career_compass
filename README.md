# 🧭 CareerCompass — Personalized Career Guide

A full-stack web application that helps students discover the most suitable career paths based on their stream, skills, interests, and academic marks. 

![CareerCompass](https://img.shields.io/badge/CareerCompass-v1.0-indigo)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Features

- 🔐 **JWT Authentication** — Secure register and login with bcrypt password hashing
- 👤 **4-Step Profile Wizard** — Stream, interests, skills and academic marks
- 🎯 **Smart Recommendation Engine** — Scores 15+ careers out of 100 based on your profile
- 📊 **Skill Gap Tracker** — See exactly which skills you have and which to learn
- 💾 **Save & Compare** — Bookmark up to 3 careers and compare side by side
- 🔍 **Search & Filter** — Search careers by name and sort by match % or salary
- 📄 **PDF Report** — Download a personalized career report with one click

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Axios |
| Backend | FastAPI (Python) |
| Database | MongoDB Atlas |
| Authentication | JWT + bcrypt |
| PDF Generation | jsPDF |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 📁 Project Structure
```
CareerCompass/
│
├── client/                      ← React Frontend
│   └── src/
│       ├── pages/
│       │   ├── Login.js         ← Login page
│       │   ├── Register.js      ← Register page
│       │   ├── ProfileSetup.js  ← 4-step wizard
│       │   ├── Dashboard.js     ← Career recommendations
│       │   └── CareerDetail.js  ← Career detail + skill gap
│       ├── utils/
│       │   └── api.js           ← Axios API helper
│       └── App.js               ← Routes & protected paths
│
└── server/                      ← FastAPI Backend
    ├── routes/
    │   ├── auth.py              ← Register & Login
    │   ├── profile.py           ← Get & Update profile
    │   └── careers.py           ← Recommendations & detail
    ├── database.py              ← MongoDB connection
    ├── main.py                  ← FastAPI entry point
    └── seed_careers.py          ← Career data seeder
```

---

## ⚙️ How It Works

1. Student registers and fills a **4-step profile wizard**
2. Selects their stream, interests, skills and marks
3. **Recommendation engine** scores all careers out of 100:
   - 30 points → Stream match
   - 40 points → Skills overlap percentage
   - 30 points → Interest tag match
4. Dashboard shows **best matches** and **explore more** sections
5. Career detail page shows full **skill gap analysis**
6. Students can **compare careers** and **download a PDF report**

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/yaminipons/CareerCompass.git
cd CareerCompass
```

### 2. Setup Backend
```bash
cd server
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside `server/`:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/career_advisor
SECRET_KEY=yoursecretkey
```

Seed the career data:
```bash
python seed_careers.py
```

Start the backend:
```bash
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### 3. Setup Frontend
```bash
cd client
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create new account |
| POST | `/auth/login` | Login and get JWT token |
| GET | `/profile/me` | Get logged in user profile |
| PUT | `/profile/update` | Update stream, skills, interests |
| GET | `/careers/recommend` | Get personalized recommendations |
| GET | `/careers/{id}` | Get single career details |

---
