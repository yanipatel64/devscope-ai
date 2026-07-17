import os


def analyze_dependencies(repo_path):

    if repo_path is None:
        return []


    package_files = [
        "package.json",
        "requirements.txt",
        "pom.xml",
        "Cargo.toml"
    ]


    found = []


    for file in package_files:

        path = os.path.join(
            repo_path,
            file
        )


        if os.path.exists(path):
            found.append(file)


    return found