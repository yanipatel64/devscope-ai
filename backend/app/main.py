from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.db.init_db import init_db
from app.services.analyzer import analyze_repository


app = FastAPI(
    title="DevScope AI API",
    description="AI-Powered Developer Intelligence Platform",
    version="1.0.0",
)


# Initialize Database
init_db()



# CORS Configuration

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
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




@app.post("/analyze")
def analyze(data: dict):

    try:

        repo_url = data.get("url")


        if not repo_url:

            raise HTTPException(
                status_code=400,
                detail="Repository URL required"
            )


        result = analyze_repository(repo_url)


        return {
            "analysis": result
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )