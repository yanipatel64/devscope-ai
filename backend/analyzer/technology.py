import os



def detect_technologies(path):

    technologies = []


    files = os.listdir(path)


    if "package.json" in files:

        technologies.append("JavaScript")



    if "tsconfig.json" in files:

        technologies.append("TypeScript")



    if "requirements.txt" in files:

        technologies.append("Python")



    if "next.config.js" in files:

        technologies.append("Next.js")



    return technologies