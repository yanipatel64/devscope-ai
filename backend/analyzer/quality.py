def calculate_quality(repo):

    score = 70


    if repo["stars"] > 100:
        score += 10


    if repo["language"]:
        score += 10


    if repo["description"]:
        score += 10


    return min(score,100)