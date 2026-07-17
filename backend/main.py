from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from analyzer.ai_engine import generate_ai_insights

import requests

from analyzer.repository import clone_repository
from analyzer.technology import detect_technologies
from analyzer.dependencies import analyze_dependencies
from analyzer.metrics import analyze_structure



app = FastAPI(
    title="DevScope AI Engine",
    description="AI-powered developer intelligence backend",
    version="1.0"
)



# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)



class RepositoryRequest(BaseModel):

    url: str





@app.get("/")
def home():

    return {

        "message":
        "DevScope AI Engine Running"

    }






@app.post("/analyze")
def analyze_repository(
    request: RepositoryRequest
):


    repo_url = request.url



    # -------------------------
    # GitHub Repository Info
    # -------------------------

    parts = repo_url.rstrip("/").split("/")

    owner = parts[-2]

    repo_name = parts[-1]



    github_api = (
        f"https://api.github.com/repos/"
        f"{owner}/{repo_name}"
    )



    github_response = requests.get(
        github_api
    )


    github_data = github_response.json()



    repository_info = {


        "name":
        github_data.get(
            "name",
            repo_name
        ),



        "owner":
        github_data.get(
            "owner",
            {}
        ).get(
            "login",
            owner
        ),



        "language":
        github_data.get(
            "language",
            "Unknown"
        ),



        "stars":
        github_data.get(
            "stargazers_count",
            0
        ),



        "forks":
        github_data.get(
            "forks_count",
            0
        ),



        "description":
        github_data.get(
            "description",
            ""
        ),



        "updated":
        github_data.get(
            "updated_at",
            ""
        )

    }






    # -------------------------
    # Clone Repository
    # -------------------------


    repo_path = clone_repository(
        repo_url
    )


    if repo_path is None:

        return {

            "error":
            "Unable to clone repository"

        }







    # -------------------------
    # Code Analysis
    # -------------------------


    technologies = detect_technologies(
        repo_path
    )



    dependencies = analyze_dependencies(
        repo_path
    )



    metrics = analyze_structure(
        repo_path
    )








    # -------------------------
    # AI Report
    # -------------------------


    ai_report = generate_ai_insights(
        repository_info
    )






    analysis = {


        "project_score":
        95,



        "security_score":
        "A",



        "architecture":
        "Analyzed",



        "repository_info":
        repository_info,



        "technologies":
        technologies,



        "dependencies":
        dependencies,



        "metrics":
        metrics,



        "recommendations":[

            "Improve code documentation",

            "Review dependency updates",

            "Optimize project structure"

        ],



        "ai_report":
        ai_report

    }






    return {


        "repository":
        repo_url,



        "analysis":
        analysis

    }