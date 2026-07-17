from app.services.ai_service import analyze_with_ai


def analyze_repository(repo_data: dict):


    ai_report = analyze_with_ai(repo_data)


    return {

        "repository_metrics": repo_data,

        "ai_analysis": ai_report

    }