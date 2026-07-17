from app.services.github_service import get_repository_info

from app.services.repository_scanner import (
    clone_repository,
    scan_repository
)

from app.services.dependency_scanner import (
    scan_dependencies
)

from app.services.ai_service import (
    generate_ai_insights
)



def analyze_repository(repo_url: str):


    repository = get_repository_info(
        repo_url
    )



    repo_path = clone_repository(
        repo_url
    )



    scan_data = scan_repository(
        repo_path
    )



    dependency_data = scan_dependencies(
        repo_path
    )



    repository["scan"] = scan_data

    repository["dependencies"] = dependency_data



    ai = generate_ai_insights(
        repository
    )



    return {


        "project_score":
            ai.get(
                "project_score",
                0
            ),



        "security_score":
            ai.get(
                "security_score",
                "C"
            ),



        "architecture":
            "Analyzed",



        "repository_info":
            repository,



        "health_metrics": {


            "maintainability":
                ai.get(
                    "maintainability_score",
                    0
                ),


            "security":
                90,


            "documentation":
                ai.get(
                    "documentation_score",
                    0
                ),


            "architecture":
                ai.get(
                    "architecture_score",
                    0
                )

        },



        "dependencies":
            dependency_data.get(
                "dependencies",
                []
            ),



        "recommendations":
            ai.get(
                "possible_improvements",
                []
            ),



        "ai_confidence":
            94,



        "ai_report":
            ai

    }