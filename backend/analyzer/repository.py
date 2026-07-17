import os
import shutil
import uuid
from git import Repo


def clone_repository(repo_url: str):

    folder = f"temp_repo_{uuid.uuid4().hex[:8]}"

    try:

        # remove old folder if exists
        if os.path.exists(folder):
            shutil.rmtree(
                folder,
                ignore_errors=True
            )


        print("Cloning repository...")

        Repo.clone_from(
            repo_url,
            folder,
            depth=1
        )


        print("Repository cloned successfully")

        return folder


    except Exception as e:

        print("Clone Error:", e)

        return None