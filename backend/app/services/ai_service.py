import os
import json

from dotenv import load_dotenv
from google import genai


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)



def generate_ai_insights(repository_info):


    prompt = f"""

You are a Principal Software Architect reviewing a GitHub repository.

Analyze only the provided repository metadata.

Repository:

{json.dumps(repository_info, indent=2)}


Return ONLY JSON.

No markdown.

No explanation.



FORMAT:


{{
"project_score":70,

"security_score":"C",

"maintainability_score":65,

"documentation_score":70,

"architecture_score":60,

"risk_level":"Medium",

"repository_health":"Needs Attention",


"architecture_flow":[
"GitHub Repository",
"Presentation Layer",
"Client Interaction Layer",
"Asset Management Layer",
"Deployment Environment"
],


"strengths":[
""
],


"possible_improvements":[
""
],


"security_recommendations":[
""
],


"documentation_suggestions":[
""
]

}}



Rules:

Static websites:

Professional startup website:
70-85


Do not recommend React migration.

Do not invent security issues.

Give exactly:

5 strengths

5 improvements

5 security recommendations

5 documentation suggestions


"""


    response = client.models.generate_content(

        model="gemini-3.1-flash-lite",

        contents=prompt,

        config={
            "temperature":0.2
        }

    )


    text=response.text


    text=text.replace(
        "```json",
        ""
    )

    text=text.replace(
        "```",
        ""
    )


    return json.loads(
        text.strip()
    )