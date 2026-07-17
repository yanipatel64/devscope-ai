import requests



def get_repository_info(repo_url: str):


    repo_path = repo_url.replace(
        "https://github.com/",
        ""
    ).strip("/")



    api_url = f"https://api.github.com/repos/{repo_path}"



    response = requests.get(api_url)



    if response.status_code != 200:

        raise Exception(
            "Repository not found"
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

    }