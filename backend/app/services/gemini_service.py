print("=" * 70)
print("LOADED GEMINI SERVICE")
print(__file__)
print("=" * 70)
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_response(prompt: str):

    print("=" * 60)
    print("USING MODEL: gemini-3.1-flash-lite")
    print("=" * 60)

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt
    )

    return response.text