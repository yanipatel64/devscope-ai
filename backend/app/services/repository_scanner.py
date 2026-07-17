import os
import shutil
import subprocess
import uuid


IGNORE_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
    ".next",
    "dist",
    "build"
}


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


    for root, dirs, files in os.walk(repo_path):

        # ignore unnecessary folders
        dirs[:] = [
            d for d in dirs
            if d not in IGNORE_DIRS
        ]


        for file in files:


            total_files += 1


            extension = os.path.splitext(file)[1].lower()


            if extension:

                languages[extension] = (
                    languages.get(extension, 0) + 1
                )


            file_path = os.path.join(
                root,
                file
            )


            try:

                with open(
                    file_path,
                    "r",
                    encoding="utf-8",
                    errors="ignore"
                ) as f:

                    total_lines += len(
                        f.readlines()
                    )


            except:

                pass



    shutil.rmtree(
        repo_path,
        ignore_errors=True
    )


    return {

        "total_files": total_files,

        "total_lines": total_lines,

        "languages": languages,

        "architecture_flow": [

            "Repository Layer",

            "Application Layer",

            "Business Logic Layer",

            "Data Layer",

            "Deployment Layer"

        ]

    }