from app.services.gemini_service import generate_response



def analyze_with_ai(repository_data: dict):

    prompt = f"""
You are DevScope AI, an enterprise software architecture reviewer.

Analyze ONLY the repository metadata below.

Repository Data:
{repository_data}

Detected Project Type:
{repository_data.get("project_type")}

IMPORTANT RULES:

- Never hallucinate technologies.
- Never invent frameworks.
- Never assume databases.
- Never assume authentication.
- If information is unavailable write:
  "Not detected from repository metadata."

STYLE RULES:

- Write professional GitHub-style Markdown.
- Keep paragraphs under 2 lines.
- Prefer bullet points over paragraphs.
- Use Markdown tables whenever possible.
- Do NOT write essays.
- Do NOT repeat information.
- Keep the report concise and easy to scan.

Generate the report in EXACTLY this format.

# Project Overview

| Property | Value |
|----------|-------|
| Project Type | |
| Primary Language | |
| Repository Size | |
| Purpose | |

---

# Technology Stack

- Item
- Item
- Item

---

# Repository Metrics

| Metric | Value |
|--------|-------|
| Total Files | |
| Lines of Code | |
| Languages | |
| Important Files | |
| Folder Structure | |

---

# Architecture

Determine the repository architecture dynamically.

First identify the repository type.

Possible repository types include:

- Static Website
- React
- Next.js
- Vue
- Angular
- Flask
- Django
- FastAPI
- Express
- Spring Boot
- Laravel
- ASP.NET
- Python Library
- Java Library
- CLI Tool

Generate ONLY the layers that actually exist.

Never force layers.

Examples:

Static Website

- Repository Layer
- Presentation Layer
- Assets Layer
- Client Logic Layer

React

- Repository Layer
- Component Layer
- State Management Layer
- API Integration Layer

Next.js

- Repository Layer
- App Router
- UI Components
- Server Components
- API Routes
- Database Layer
- Deployment Layer

Flask

- Repository Layer
- Routes Layer
- Application Layer
- Business Logic Layer
- Database Layer

FastAPI

- Repository Layer
- API Layer
- Service Layer
- Database Layer
- Authentication Layer

Express

- Repository Layer
- Routing Layer
- Controller Layer
- Business Logic Layer
- Database Layer

For every detected layer use exactly this format:

## Layer Name

- concise explanation
- concise explanation

Rules:

- Never invent layers.
- Never force Database Layer.
- Never force Deployment Layer.
- Never force Authentication Layer.
- Never force Business Logic Layer.
- Never create empty sections.
- Skip layers that are not detected.

---

# Code Quality

| Category | Status |
|----------|--------|
| Documentation | |
| Organization | |
| Configuration | |
| Testing | |
| Maintainability | |

---

# Security

| Check | Status |
|-------|--------|
| Environment Files | |
| Secrets | |
| Authentication | |
| User Input Handling | |
| Dependencies | |

---

# Performance

- Bullet
- Bullet
- Bullet

---

# Recommendations

1. Recommendation
2. Recommendation
3. Recommendation
4. Recommendation
5. Recommendation

Keep recommendations practical and repository-specific.

Return ONLY Markdown.
"""
    return generate_response(prompt)