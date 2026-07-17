from app.services.gemini_service import generate_response
result = generate_response(
    "Explain DevScope-AI in one sentence"
)

print(result)