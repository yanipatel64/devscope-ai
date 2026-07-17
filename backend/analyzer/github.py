import requests


def get_repository_info(repo_url):

    parts = repo_url.rstrip("/").split("/")

    owner = parts[-2]
    repo = parts[-1]


    api_url = f"https://api.github.com/repos/{owner}/{repo}"


    response = requests.get(api_url)


    if response.status_code != 200:
        return None


    data = response.json()


    return {

        "name": data["name"],

        "owner": data["owner"]["login"],

        "language": data["language"],

        "stars": data["stargazers_count"],

        "forks": data["forks_count"],

        "description": data["description"],

        "updated": data["updated_at"]

    }