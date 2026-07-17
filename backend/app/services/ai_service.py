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

You are a Senior Software Architect and Principal Engineer.

Analyze this GitHub repository.

Repository Information:

{json.dumps(repository_info, indent=2)}


Return ONLY valid JSON.

Generate:

{{
    "project_score": number,

    "security_score": "A" | "B" | "C" | "D",

    "maintainability_score": number,

    "documentation_score": number,

    "architecture_score": number,

    "risk_level": "Low" | "Medium" | "High",


    "strengths": [
        "point 1",
        "point 2",
        "point 3"
    ],


    "possible_improvements": [
        "point 1",
        "point 2",
        "point 3"
    ],


    "architecture_observations": [
        "point 1",
        "point 2",
        "point 3"
    ],


    "security_recommendations": [
        "point 1",
        "point 2",
        "point 3"
    ],


    "documentation_suggestions": [
        "point 1",
        "point 2",
        "point 3"
    ]

}}


Rules:

- Return only JSON.
- No markdown.
- No explanation.
- Keep recommendations practical.
"""


    response = client.models.generate_content(

        model="gemini-3.1-flash-lite",

        contents=prompt

    )


    text = response.text


    text = text.replace("```json", "")
    text = text.replace("```", "")


    return json.loads(text.strip())