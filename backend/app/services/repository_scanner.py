import os
import shutil
import subprocess
import uuid
import json

IGNORE_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
    ".next",
    "dist",
    "build"
}


TEXT_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".html",
    ".css",
    ".scss",
    ".php",
    ".java",
    ".cpp",
    ".c",
    ".go",
    ".rs",
    ".json",
    ".md",
    ".yml",
    ".yaml",
    ".xml"
}



def clone_repository(repo_url: str):

    TEMP_FOLDER = "temp_repositories"

    os.makedirs(
        TEMP_FOLDER,
        exist_ok=True
    )

    temp_dir = os.path.join(
        TEMP_FOLDER,
        f"repo_{uuid.uuid4().hex[:8]}"
    )


    subprocess.run(
        [
            "git",
            "clone",
            "--depth",
            "1",
            repo_url,
            temp_dir
        ],
        check=True
    )


    return temp_dir

def detect_framework(
    important_files,
    package_dependencies
):

    files = [f.lower() for f in important_files]

    deps = {
        k.lower()
        for k in package_dependencies.keys()
    }

    if "next" in deps:
        return "Next.js"

    if "react" in deps:
        return "React"

    if "vue" in deps:
        return "Vue"

    if "@angular/core" in deps:
        return "Angular"

    if "express" in deps:
        return "Express"

    # Python frameworks (dependency first)

    if "fastapi" in deps:
        return "FastAPI"

    if "django" in deps:
        return "Django"

    if "flask" in deps:
        return "Flask"


    # File based fallback

    if any("manage.py" in f for f in files):
        return "Django"

    if any("app.py" in f for f in files):
        return "Flask"

    if any("main.py" in f for f in files):
        return "FastAPI"

    php_files = sum(
        1 for f in files
        if f.endswith(".php")
    )

    html_files = sum(
        1 for f in files
        if f.endswith(".html")
    )


    if html_files > 0 and php_files <= 2:
        return "Static Website"


    if php_files > 0:
        return "PHP"

    return "Unknown"

def generate_architecture_flow(
    repo_path,
    languages,
    has_package,
    has_requirements,
    has_docker,
    has_github,
    important_files,
    package_dependencies
):

    flow = []

    framework = detect_framework(
        important_files,
        package_dependencies
    )

    # Always include
    flow.append({
        "layer": "Repository Layer",
        "reason": "Repository structure analyzed"
    })

    # Framework-specific architecture

    if framework == "Static Website":

        flow.extend([
            {
                "layer": "Presentation Layer",
                "reason": "HTML pages render the user interface"
            },
            {
                "layer": "Assets Layer",
                "reason": "CSS, images and fonts provide styling and resources"
            },
            {
                "layer": "Client Logic Layer",
                "reason": "JavaScript powers browser interactions"
            }
        ])

    elif framework == "React":

        flow.extend([
            {
                "layer": "Component Layer",
                "reason": "Reusable React components"
            },
            {
                "layer": "State Management Layer",
                "reason": "Application state handling"
            },
            {
                "layer": "API Integration Layer",
                "reason": "Frontend communicates with backend APIs"
            }
        ])

    elif framework == "Next.js":

        flow.extend([
            {
                "layer": "App Router",
                "reason": "File-based routing structure"
            },
            {
                "layer": "Server Components",
                "reason": "Server-side rendering components"
            },
            {
                "layer": "UI Components",
                "reason": "Reusable frontend components"
            },
            {
                "layer": "API Routes",
                "reason": "Backend endpoints inside Next.js"
            }
        ])

    elif framework == "Express":

        flow.extend([
            {
                "layer": "Routing Layer",
                "reason": "Express route definitions"
            },
            {
                "layer": "Controller Layer",
                "reason": "Request handling logic"
            },
            {
                "layer": "Business Logic Layer",
                "reason": "Application services"
            }
        ])

    elif framework == "FastAPI":

        flow.extend([
            {
                "layer": "API Layer",
                "reason": "FastAPI routes and REST endpoints detected"
            },
            {
                "layer": "Application Layer",
                "reason": "FastAPI application services detected"
            },
            {
                "layer": "Business Logic Layer",
                "reason": "Backend processing logic detected"
            }
        ])


    elif framework == "Flask":

        flow.extend([
            {
                "layer": "Routes Layer",
                "reason": "Flask endpoints"
            },
            {
                "layer": "Application Layer",
                "reason": "Core Flask application"
            },
            {
                "layer": "Business Logic Layer",
                "reason": "Business processing"
            }
        ])

    elif framework == "Django":

        flow.extend([
            {
                "layer": "Views Layer",
                "reason": "Django views"
            },
            {
                "layer": "Models Layer",
                "reason": "ORM models"
            },
            {
                "layer": "Templates Layer",
                "reason": "Server-rendered templates"
            }
        ])

    else:

        if ".html" in languages:
            flow.append({
                "layer": "Presentation Layer",
                "reason": "Frontend resources detected"
            })

        if ".js" in languages or ".ts" in languages:
            flow.append({
                "layer": "Client Logic Layer",
                "reason": "JavaScript or TypeScript detected"
            })

        if ".php" in languages:

            flow.append({
                "layer": "Server-side Processing Layer",
                "reason": "PHP scripts detected for server-side operations"
            })


        elif any(ext in languages for ext in [".py", ".java", ".go"]):

            flow.append({
                "layer": "Application Layer",
                "reason": "Backend source files detected"
            })

        # Folder based architecture detection

    folders = [
        f.lower()
        for f in important_files
    ]


    if any(
        "controller" in f or 
        "route" in f or 
        "api" in f
        for f in folders
    ):
        flow.append({
            "layer": "API Layer",
            "reason": "API routes and controllers detected"
        })


    if any(
        "service" in f
        for f in folders
    ):
        flow.append({
            "layer": "Service Layer",
            "reason": "Service based business architecture detected"
        })


    if any(
        "model" in f or 
        "schema" in f
        for f in folders
    ):
        flow.append({
            "layer": "Model Layer",
            "reason": "Data models and schemas detected"
        })


    if any(
        "component" in f
        for f in folders
    ):
        flow.append({
            "layer": "Component Layer",
            "reason": "Reusable UI components detected"
        })

        # Optional layers

    files = [f.lower() for f in important_files]

    database_keywords = [
        "db",
        "database",
        "model",
        "schema",
        "migration"
    ]

    if any(
        keyword in file
        for file in files
        for keyword in database_keywords
    ):
        flow.append({
            "layer": "Data Layer",
            "reason": "Database-related files detected"
        })


    if has_package or has_requirements:
        flow.append({
            "layer": "Dependency Management",
            "reason": "Dependency configuration detected"
        })


    if has_docker or has_github:
        flow.append({
            "layer": "Deployment Layer",
            "reason": "Deployment configuration detected"
        })


    # Remove duplicate architecture layers

    unique_flow = []
    seen_layers = set()

    for item in flow:
        if item["layer"] not in seen_layers:
            unique_flow.append(item)
            seen_layers.add(item["layer"])


    return unique_flow

def scan_repository(repo_path: str):


    total_files = 0

    total_lines = 0


    languages = {}

    important_files = []

    folder_structure = []


    readme = ""

    package_json = ""

    package_dependencies = {}

    requirements = ""

    has_config = False

    has_docker = False

    has_license = False

    has_env = False





    for root, dirs, files in os.walk(repo_path):


        dirs[:] = [
            d for d in dirs
            if d not in IGNORE_DIRS
        ]



        relative_root = os.path.relpath(
            root,
            repo_path
        )



        if relative_root != ".":
            folder_structure.append(relative_root)




        for file in files:


            total_files += 1



            extension = os.path.splitext(file)[1].lower()



            if extension:

                languages[extension] = (
                    languages.get(extension,0)+1
                )




            file_path = os.path.join(
                root,
                file
            )



            relative_path = os.path.relpath(
                file_path,
                repo_path
            )



            if extension in {

                ".py",
                ".js",
                ".ts",
                ".tsx",
                ".jsx",
                ".html",
                ".css",
                ".scss",
                ".php",
                ".java",
                ".cpp",
                ".c",
                ".go",
                ".rs",
                ".json",
                ".md",
                ".yml",
                ".yaml",
                ".xml"

            }:

                important_files.append(
                    relative_path
                )





            filename = file.lower()



            if filename == "readme.md":

                readme = file_path



            if filename == "package.json":

                package_json = file_path
                has_config = True

                try:
                    with open(
                        file_path,
                        "r",
                        encoding="utf-8"
                    ) as f:

                        data = json.load(f)

                        package_dependencies = {
                            **data.get("dependencies", {}),
                            **data.get("devDependencies", {})
                        }

                except:
                    pass

            elif filename in {
                "pyproject.toml",
                "pom.xml",
                "composer.json",
                "cargo.toml",
                "go.mod"
            }:

                package_json = file_path
                has_config = True



            if filename == "requirements.txt":

                requirements = file_path



            if filename == "dockerfile":

                has_docker = True



            if filename.startswith("license"):

                has_license = True



            if filename == ".env.example":

                has_env = True





            if extension in TEXT_EXTENSIONS:

                try:

                    with open(
                        file_path,
                        "r",
                        encoding="utf-8",
                        errors="ignore"
                    ) as f:

                        content = f.read()

                        total_lines += len(
                            content.splitlines()
                        )

                except:

                    pass





    has_readme = bool(readme)

    has_package = bool(package_json) or has_config
    
    has_requirements = bool(requirements)



    has_tests = any(

        "test" in folder.lower()

        for folder in folder_structure

    )



    has_github = any(

        ".github" in folder.lower()

        for folder in folder_structure

    )




    print("\n========== SCANNER FLAGS ==========")

    print("README:", has_readme)

    print("PACKAGE:", has_package)

    print("REQUIREMENTS:", has_requirements)

    print("TESTS:", has_tests)

    print("GITHUB:", has_github)

    print("DOCKER:", has_docker)

    print("LICENSE:", has_license)

    print("ENV:", has_env)

    print("===================================\n")


    framework = detect_framework(
    important_files,
    package_dependencies
)



    return {

        "framework": framework,

        "total_files": total_files,

        "repo_path": repo_path,

        "total_lines": total_lines,


        "languages": languages,



        "important_files":
            important_files[:100],



        "folder_structure":
            folder_structure,



        "readme":
            readme,



        "package_json":
            package_json,



        "requirements":
            requirements,



        "has_readme":
            has_readme,



        "has_package":
            has_package,



        "has_requirements":
            has_requirements,



        "has_tests":
            has_tests,



        "has_github":
            has_github,



        "has_docker":
            has_docker,



        "has_license":
            has_license,



        "has_env":
            has_env,



        "architecture_flow": generate_architecture_flow(
    repo_path,
    languages,
    has_package,
    has_requirements,
    has_docker,
    has_github,
    important_files,
    package_dependencies
)

    }