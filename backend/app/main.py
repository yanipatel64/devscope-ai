from fastapi import FastAPI
from app.api.router import router


app = FastAPI(
    title="DevScope-AI",
    version="1.0.0",
    description="AI-powered repository analysis platform"
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