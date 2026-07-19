from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os

from app.api.router import router


app = FastAPI(
    title="DevScope-AI",
    version="1.0.0",
    description="AI-powered repository analysis platform"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", ""),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "DevScope-AI running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }