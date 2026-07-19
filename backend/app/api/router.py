from fastapi import APIRouter, HTTPException

import traceback
import os
import shutil
from datetime import datetime, timedelta

from app.services.repository_scanner import (
    clone_repository,
    scan_repository
)

from app.services.analyzer import analyze_repository


router = APIRouter()

def cleanup_old_repositories():

    temp_folder = "temp_repositories"

    if not os.path.exists(temp_folder):
        return


    limit = datetime.now() - timedelta(hours=2)


    for folder in os.listdir(temp_folder):

        path = os.path.join(
            temp_folder,
            folder
        )


        if os.path.isdir(path):

            created_time = datetime.fromtimestamp(
                os.path.getctime(path)
            )


            if created_time < limit:

                shutil.rmtree(
                    path,
                    ignore_errors=True
                )

                print(
                    "Removed old temp repository:",
                    path
                )

@router.get("/analyze")
def analyze_repo(repo_url: str):

    repo_path = None

    cleanup_old_repositories()

    try:

        print("\n========== DEVScope AI Analysis Started ==========")


        # Step 1: Clone repository
        print("STEP 1: Cloning repository...")

        repo_path = clone_repository(repo_url)


        print("Repository cloned:", repo_path)



        # Step 2: Scan repository
        print("STEP 2: Scanning repository...")

        scan_result = scan_repository(
            repo_path
        )


        print("Scan completed")

        print(scan_result)



        # Step 3: AI Analysis
        print("STEP 3: Generating AI report...")


        final_result = analyze_repository(
            scan_result,
            repo_url
        )


        print("STEP 4: Analysis completed")


        return {

            "repository": repo_url,

            "analysis": final_result

        }



    except Exception as e:


        print("\n========== DEVScope AI ERROR ==========")

        traceback.print_exc()

        print("=======================================\n")


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )



    finally:

        if repo_path and os.path.exists(repo_path):

            try:

                shutil.rmtree(
                    repo_path,
                    onerror=lambda func, path, exc:
                    os.chmod(path, 0o777) or func(path)
                )

                print(
                    "Temporary repository cleaned:",
                    repo_path
                )

            except Exception as e:

                print(
                    "Cleanup failed:",
                    e
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