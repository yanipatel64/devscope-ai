from app.services.gemini_service import generate_response


def analyze_with_ai(repository_data: dict):

    prompt = f"""
You are DevScope-AI, an advanced AI code intelligence platform.

Analyze the following repository:

Repository Information:
{repository_data}


Generate a professional software analysis report.

Include:

1. Project Overview
2. Architecture Analysis
3. Code Quality Review
4. Dependency Analysis
5. Security Observations
6. Performance Suggestions
7. Improvement Recommendations

Make the response structured and easy to understand.
"""

    result = generate_response(prompt)

    return result