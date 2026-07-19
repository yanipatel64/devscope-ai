import requests


def get_repository_info(repo_url: str):

    repo_url = repo_url.strip()

    if "github.com/" not in repo_url:
        raise Exception("Invalid GitHub URL")


    repo_path = repo_url.split(
        "github.com/"
    )[1]


    repo_path = repo_path.replace(
        ".git",
        ""
    ).strip("/")


    print("GitHub API PATH:", repo_path)


    api_url = f"https://api.github.com/repos/{repo_path}"


    response = requests.get(
        api_url,
        headers={
            "Accept": "application/vnd.github+json"
        }
    )


    if response.status_code != 200:

        raise Exception(
            f"Repository not found: {repo_path}"
        )


    data = response.json()


    return {

        "name": data.get("name"),

        "owner": data.get("owner", {}).get("login"),

        "language": data.get("language"),

        "stars": data.get("stargazers_count"),

        "forks": data.get("forks_count"),

        "description": data.get("description"),

        "updated": data.get("updated_at"),

        "url": data.get("html_url")

    }