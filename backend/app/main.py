from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.init_db import init_db
from app.models.user import User

app = FastAPI(
    title="DevScope AI API",
    description="AI-Powered Developer Intelligence Platform",
    version="1.0.0",
)

init_db()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to DevScope AI 🚀",
        "status": "Backend is running successfully"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "DevScope AI Backend"
    }