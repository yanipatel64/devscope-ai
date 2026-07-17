from app.services.github_service import get_repository
from app.services.ai_service import generate_ai_insights


def analyze_repository(repo_url: str):

    # Repository Information
    repository = get_repository(repo_url)

    # Technology Detection
    technologies = []

    if repository.get("language"):
        technologies.append(repository["language"])

    # Dependency Detection (basic for now)
    dependencies = []

    language = (repository.get("language") or "").lower()

    if language == "javascript":
        dependencies.append("package.json")

    elif language == "typescript":
        dependencies.append("package.json")

    elif language == "python":
        dependencies.append("requirements.txt")

    elif language == "java":
        dependencies.append("pom.xml")

    elif language == "go":
        dependencies.append("go.mod")

    elif language == "rust":
        dependencies.append("Cargo.toml")

    # Repository Metrics
    metrics = {
        "total_files": 0,
        "structure_quality": "Good"
    }

    # AI Analysis
    ai = generate_ai_insights(repository)

    # Final Response
    return {

        "project_score": ai["project_score"],

        "security_score": ai["security_score"],

        "architecture": "Analyzed",

        "repository_info": repository,

        "technologies": technologies,

        "dependencies": dependencies,

        "metrics": metrics,

        "recommendations": [
            "Improve code documentation",
            "Review dependency updates",
            "Optimize project structure",
        ],

        "ai_report": ai,
    }