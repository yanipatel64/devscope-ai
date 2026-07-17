import os
import shutil
import subprocess
import uuid


def clone_repository(repo_url: str):

    temp_dir = f"temp_repo_{uuid.uuid4().hex[:8]}"

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


def scan_repository(repo_path: str):

    total_files = 0
    total_lines = 0

    languages = {}

    architecture = []

    for root, dirs, files in os.walk(repo_path):

        for file in files:

            total_files += 1

            extension = os.path.splitext(file)[1].lower()

            if extension:

                languages[extension] = languages.get(extension, 0) + 1

            path = os.path.join(root, file)

            try:

                with open(
                    path,
                    "r",
                    encoding="utf-8",
                    errors="ignore"
                ) as f:

                    total_lines += len(f.readlines())

            except:
                pass

    architecture = [

        "GitHub Repository",

        "Presentation Layer",

        "Client Interaction Layer",

        "Asset Management Layer",

        "Deployment Environment"

    ]

    shutil.rmtree(repo_path, ignore_errors=True)

    return {

        "total_files": total_files,

        "total_lines": total_lines,

        "languages": languages,

        "architecture_flow": architecture

    }