from app.services.ai_service import analyze_with_ai
from app.services.github_service import get_repository_info
from app.services.security_analyzer import analyze_security

print("🔥 NEW ANALYZER LOADED")

def generate_recommendations(repo_data):

    recommendations = []


    framework = repo_data.get(
        "framework",
        ""
    )


    # Framework based recommendations

    if framework == "React":

        recommendations.extend([
            "Improve component scalability by introducing reusable design patterns",
            "Add component testing using Jest and React Testing Library",
            "Optimize frontend performance with lazy loading"
        ])


    elif framework == "Next.js":

        recommendations.extend([
            "Optimize server and client component usage",
            "Improve application performance using Next.js caching strategies",
            "Add image optimization and route-level performance improvements"
        ])


    elif framework == "FastAPI":

        recommendations.extend([
            "Separate API routes and business logic into service layers",
            "Add API versioning for better maintainability",
            "Implement automated API testing"
        ])

    elif framework == "Static Website":

        recommendations.extend([
            "Optimize images and static assets for better performance",
            "Improve SEO with metadata, sitemap and structured content",
            "Add accessibility improvements for better user experience"
        ])

    elif framework == "Django":

        recommendations.extend([
            "Improve scalability by separating business logic from views",
            "Optimize database queries using indexing",
            "Increase automated test coverage"
        ])


    elif framework == "Flask":

        recommendations.extend([
            "Introduce application factory pattern for scalability",
            "Separate routes, services and database logic",
            "Add API testing workflow"
        ])



    # General repository improvements

    if not repo_data.get("has_readme"):

        recommendations.append(
            "Add a detailed README with setup instructions and project documentation"
        )


    if (
        not repo_data.get("has_tests")
        and repo_data.get("framework") not in [
            "Static Website"
        ]
    ):

        recommendations.append(
            "Introduce automated testing to improve reliability and code confidence"
        )


    if (
        not repo_data.get("has_package")
        and not repo_data.get("has_requirements")
        and repo_data.get("framework") not in [
            "Static Website",
            "PHP"
        ]
    ):

        recommendations.append(
            "Add dependency management for better environment consistency"
        )


    if (
        not repo_data.get("has_github")
        and repo_data.get("framework") not in [
            "Static Website"
        ]
    ):

        recommendations.append(
            "Add GitHub workflows for CI/CD automation"
        )


    if repo_data.get("total_lines",0) > 100000:

        recommendations.append(
            "Review large files and improve code organization"
        )


    if len(recommendations) == 0:

        recommendations.append(
            "Repository follows good engineering practices"
        )


    return recommendations[:5]

def detect_project_type(repo_data):

    files = [
        f.lower()
        for f in repo_data.get("important_files", [])
    ]

    framework = repo_data.get(
        "framework",
        ""
    )


    # Use detected framework first

    if framework == "FastAPI":

        return "Full-stack FastAPI + React Application"


    if framework == "Next.js":

        return "Next.js Application"


    if framework == "React":

        return "React Application"


    if framework == "Django":

        return "Django Application"


    if framework == "Flask":

        return "Flask Application"


    # Fallback detection

    if "manage.py" in files:
        return "Django Application"


    if "app.py" in files:
        return "Flask Application"


    if "main.py" in files:
        return "Python Application"


    if "package.json" in files:
        return "Node.js / React"


    languages = repo_data.get("languages", {})

    html_files = languages.get(".html",0)
    php_files = languages.get(".php",0)


    if html_files > php_files:

        return "Static Website"


    if php_files > 0:

        return "PHP Web Application"


    return "Unknown"

def analyze_repository(repo_data: dict, repo_url: str):

    total_files = repo_data.get("total_files", 0)

    total_lines = repo_data.get("total_lines", 0)

        # -------------------------
    # Complexity Detection
    # -------------------------

    if total_files < 50 and total_lines < 5000:
        complexity = "Simple"

    elif total_files < 300:
        complexity = "Moderate"

    else:
        complexity = "Advanced"

    languages = repo_data.get("languages", {})

    framework = repo_data.get(
    "framework",
    ""
)

    important_files = repo_data.get(
        "important_files",
        []
    )

    folders = repo_data.get(
        "folder_structure",
        []
    )

    language_count = len(languages)

    has_readme = repo_data.get("has_readme", False)

    has_package = repo_data.get("has_package", False)

    has_requirements = repo_data.get(
        "has_requirements",
        False
    )

    has_tests = repo_data.get("has_tests", False)

    has_github = repo_data.get("has_github", False)

    has_docker = repo_data.get("has_docker", False)

    has_license = repo_data.get("has_license", False)

    has_env = repo_data.get("has_env", False)

    security_analysis = analyze_security(
    repo_data.get("repo_path", ""),
    repo_data.get("important_files", []),
    repo_data.get("folder_structure", [])
)

    print("===== REPO FLAGS =====")

    print("README:", has_readme)
    print("PACKAGE:", has_package)
    print("REQUIREMENTS:", has_requirements)
    print("TESTS:", has_tests)
    print("GITHUB:", has_github)
    print("DOCKER:", has_docker)
    print("LICENSE:", has_license)
    print("ENV:", has_env)

    print("======================")


    # -------------------------
    # Project Health
    # -------------------------

    project_health = 50


    if has_readme:
        project_health += 15

    if ".html" in languages:
        project_health += 5

    if has_package or has_requirements:
        project_health += 10

    if has_license:
        project_health += 5

    if total_files > 50:
        project_health += 5

    if total_files > 200:
        project_health += 5

    if total_lines > 100000:
        project_health -= 10

    project_health = max(
        40,
        min(project_health,95)
    )



    # -------------------------
    # Security
    # -------------------------

    security = 50


    # Documentation helps security awareness
    if has_readme:
        security += 10


    # Dependency tracking
    if has_package or has_requirements:
        security += 10


    # Repository automation
    if has_github:
        security += 5


    # Testing improves confidence
    if has_tests:
        security += 10


    # Docker/security isolation
    if has_docker:
        security += 5


    # Sensitive files detection
    if has_env:
        security -= 15


    # No license is not a security issue
    # removed penalty


    security = security_analysis["score"]

    # -------------------------
    # Architecture
    # -------------------------

    architecture = 50


    architecture += min(
        len(folders) * 2,
        20
    )


    if has_package:
        architecture += 10


    if has_docker:
        architecture += 10


    if has_tests:
        architecture += 10


    if total_files > 300:
        architecture += 5

    if len(folders) >= 5:
        architecture += 10

    # Static website architecture bonus

    if framework == "Static Website":

        architecture += 10


    architecture = max(
        30,
        min(architecture,95)
    )



    # -------------------------
    # Maintainability
    # -------------------------

    maintainability = 55


    if has_readme:
        maintainability += 15


    if has_tests:
        maintainability += 15

    if has_package or has_requirements:
        maintainability += 10

    # Static websites have simpler maintenance requirements

    if framework == "Static Website":

        maintainability += 5

    maintainability += min(
        len(important_files)//20,
        10
    )


    if total_lines > 100000:
        maintainability -= 10


    if total_lines > 300000:
        maintainability -= 10


    maintainability = max(
        35,
        min(maintainability,90)
    )

    repo_data["project_type"] = detect_project_type(repo_data)

    ai_report = analyze_with_ai(repo_data)

    print("===== FINAL SCORES =====")

    print(
        "Health:",
        project_health
    )

    print(
        "Security:",
        security
    )

    print(
        "Architecture:",
        architecture
    )

    print(
        "Maintainability:",
        maintainability
    )

    print("========================")

    score_factors = {

    "project_health": [],

    "security": [],

    "architecture": [],

    "maintainability": []

}


    # Project Health factors

    if has_readme:
        score_factors["project_health"].append(
            "README documentation available"
        )

    if total_files > 10:
        score_factors["project_health"].append(
            "Repository contains multiple project files"
        )

    if not has_tests and framework not in [
        "Static Website"
    ]:

        score_factors["security"].append(
            "No automated tests detected"
        )


    # Security factors

    if not has_env:
        score_factors["security"].append(
            "No environment configuration detected"
        )

    if not has_tests:
        score_factors["security"].append(
            "No automated tests detected"
        )

    if has_license:
        score_factors["security"].append(
            "License configuration available"
        )


    # Architecture factors

    if len(folders) > 3:
        score_factors["architecture"].append(
            "Organized folder structure detected"
        )

    if has_package or has_requirements:
        score_factors["architecture"].append(
            "Dependency management detected"
        )


    # Maintainability factors

    if has_readme:
        score_factors["maintainability"].append(
            "Documentation improves maintainability"
        )

    if not has_tests and framework not in [
        "Static Website"
    ]:

        score_factors["maintainability"].append(
            "Testing coverage can be improved"
        )

    return {

        "repository_info": get_repository_info(
            repo_url
        ),

        "complexity": complexity,

        "repository_metrics": {

            "total_files": total_files,

            "total_lines": total_lines,

            "languages": languages,

            "important_files": important_files,

            "folder_structure": folders,

            "architecture_flow": repo_data.get(
    "architecture_flow"
) or []

        },

        "scores": {

            "project_health": project_health,

            "security": security,

            "architecture": architecture,

            "maintainability": maintainability

        },

        "security_analysis": security_analysis,

        "score_factors": score_factors,

        "recommendations": generate_recommendations(repo_data),

        "ai_analysis": ai_report

    }