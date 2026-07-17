from google import genai
import os
import json
from dotenv import load_dotenv


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)



def generate_ai_insights(repository_info):


    prompt = f"""

You are an expert software architect.

Analyze this GitHub repository:

Repository Name:
{repository_info.get("name")}

Owner:
{repository_info.get("owner")}

Language:
{repository_info.get("language")}

Stars:
{repository_info.get("stars")}

Forks:
{repository_info.get("forks")}


Generate professional engineering insights.

Return ONLY valid JSON.

Do not include markdown.
Do not include ```json blocks.

JSON format:

{{
  "strengths": [],
  "possible_improvements": [],
  "architecture_observations": [],
  "security_recommendations": [],
  "documentation_suggestions": []
}}


Keep the response concise and useful for developers.

"""


    response = client.models.generate_content(

        model="gemini-3.1-flash-lite",

        contents=prompt

    )


    text = response.text


    # Remove markdown if Gemini still adds it

    text = text.replace("```json", "")
    text = text.replace("```", "")


    try:

        return json.loads(
            text.strip()
        )


    except json.JSONDecodeError:


        return {

            "strengths": [],

            "possible_improvements": [],

            "architecture_observations": [],

            "security_recommendations": [],

            "documentation_suggestions": [],

            "raw_response": text

        }