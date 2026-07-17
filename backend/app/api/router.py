from fastapi import APIRouter, HTTPException

from app.services.repository_scanner import (
    clone_repository,
    scan_repository
)

from app.services.analyzer import analyze_repository


router = APIRouter()


@router.get("/analyze")
def analyze_repo(repo_url: str):

    try:

        repo_path = clone_repository(repo_url)

        scan_result = scan_repository(repo_path)

        final_result = analyze_repository(scan_result)


        return {
            "repository": repo_url,
            "analysis": final_result
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/")
def root():

    return {
        "message": "DevScope-AI API running"
    }


@router.get("/health")
def health():

    return {
        "status": "healthy"
    }