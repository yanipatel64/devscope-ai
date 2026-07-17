import os


DEPENDENCY_FILES = {

    "requirements.txt",

    "package.json",

    "package-lock.json",

    "pom.xml",

    "build.gradle",

    "Cargo.toml",

    "composer.json"

}


def scan_dependencies(repo_path):

    dependencies = []

    for root, dirs, files in os.walk(repo_path):

        for file in files:

            if file not in DEPENDENCY_FILES:

                continue

            path = os.path.join(root, file)

            try:

                with open(
                    path,
                    "r",
                    encoding="utf-8",
                    errors="ignore"
                ) as f:

                    content = f.read()

                dependencies.append({

                    "file": file,

                    "path": path,

                    "size": len(content),

                    "detected": True

                })

            except:

                pass

    return {

        "dependencies": dependencies

    }