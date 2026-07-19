import os
import re


SECRET_PATTERNS = [
    r"api[_-]?key\s*=\s*['\"].+['\"]",
    r"secret[_-]?key\s*=\s*['\"].+['\"]",
    r"password\s*=\s*['\"].+['\"]",
    r"token\s*=\s*['\"].+['\"]",
    r"aws[_-]?access[_-]?key\s*=\s*['\"].+['\"]",
    r"private[_-]?key\s*=\s*['\"].+['\"]"
]


AUTH_PATTERNS = [
    "jwt",
    "oauth",
    "authentication",
    "authenticate",
    "login",
    "middleware",
    "session",
    "permission",
    "authorization"
]


SECURITY_FILES = [
    ".env",
    ".env.local",
    ".env.production",
    "credentials",
    "secret"
]


def analyze_security(
    repo_path,
    important_files,
    folder_structure
):

    issues = []
    positives = []

    secrets_found = False


    # -----------------------------
    # Secret Detection
    # -----------------------------

    files_checked = 0


    for file in important_files:

        full_path = os.path.join(
            repo_path,
            file
        )


        if not os.path.exists(full_path):
            continue


        try:

            with open(
                full_path,
                "r",
                encoding="utf-8",
                errors="ignore"
            ) as f:

                content = f.read()


            files_checked += 1


            for pattern in SECRET_PATTERNS:

                if re.search(
                    pattern,
                    content,
                    re.IGNORECASE
                ):

                    secrets_found = True

                    issues.append(
                        f"Possible exposed secret detected in {file}"
                    )

                    break


        except:

            pass



    if not secrets_found:

        positives.append(
            "No exposed secrets detected"
        )



    # -----------------------------
    # Authentication Detection
    # -----------------------------


    auth_found = False


    for file in important_files:

        filename = file.lower()


        if any(
            keyword in filename
            for keyword in AUTH_PATTERNS
        ):

            auth_found = True
            break



    if auth_found:

        positives.append(
            "Authentication logic detected"
        )

    else:

        static_site = any(
            f.endswith(".html") or f.endswith(".css")
            for f in important_files
        )

        if not static_site:
            issues.append(
                "Authentication mechanism not clearly detected"
            )



    # -----------------------------
    # Environment File Detection
    # -----------------------------


    env_found = False


    for file in important_files:

        filename = file.lower()


        if any(
            env in filename
            for env in SECURITY_FILES
        ):

            env_found = True
            break



    if env_found:

        issues.append(
            "Environment configuration file detected"
        )

    else:

        positives.append(
            "No environment secrets detected"
        )



    # -----------------------------
    # Dependency Detection
    # -----------------------------

    dependency_found = any(

        "package.json" in file.lower()
        or
        "requirements.txt" in file.lower()
        or
        "pyproject.toml" in file.lower()
        or
        "pom.xml" in file.lower()
        or
        "cargo.toml" in file.lower()
        or
        "composer.json" in file.lower()
        or
        "go.mod" in file.lower()
        or
        "gemfile" in file.lower()

        for file in important_files

    )


    if dependency_found:

        positives.append(
            "Dependency configuration available"
        )

    else:

        issues.append(
            "Dependency configuration not detected"
        )



    # -----------------------------
    # Security Score
    # -----------------------------


    score = 95


    score -= len(issues) * 8


    score = max(
        40,
        min(score,95)
    )


    if score >= 90:
        status = "Excellent"

    elif score >= 75:
        status = "Good"

    elif score >= 60:
        status = "Needs Improvement"

    else:
        status = "Risk"



    return {

        "score": score,

        "status": status,

        "files_checked": files_checked,

        "issues": list(set(issues)),

        "positives": list(set(positives))

    }