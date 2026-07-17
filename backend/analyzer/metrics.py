import os



def analyze_structure(path):


    total_files = 0


    for root,dirs,files in os.walk(path):

        total_files += len(files)



    return {

        "total_files": total_files,

        "structure_quality":
            "Good"

    }