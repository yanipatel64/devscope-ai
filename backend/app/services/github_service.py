import requests


def get_repository(repo_url: str):

    repo_path = repo_url.replace(
        "https://github.com/",
        ""
    ).strip("/")

    api = f"https://api.github.com/repos/{repo_path}"

    response = requests.get(api)

    if response.status_code != 200:
        raise Exception("Repository not found")

    data = response.json()

    return {
        "name": data["name"],
        "owner": data["owner"]["login"],
        "language": data["language"],
        "stars": data["stargazers_count"],
        "forks": data["forks_count"],
        "description": data["description"],
        "updated": data["updated_at"],
    }