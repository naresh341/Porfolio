import base64
import hashlib
import hmac
import json
import logging
import re
from datetime import datetime

import httpx
import requests
from app.core.config import settings
from app.models.projectModel import Project
from app.repositories.projectRepo import ProjectRepository
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.utils.github_og import generate_github_og_image

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Language → accent colour
# ---------------------------------------------------------------------------

LANGUAGE_COLORS: dict[str, str] = {
    "Python": "#3776AB",
    "TypeScript": "#3178C6",
    "JavaScript": "#F7DF1E",
    "Rust": "#CE422B",
    "Go": "#00ADD8",
    "Java": "#B07219",
    "C++": "#F34B7D",
    "C#": "#178600",
    "Ruby": "#CC342D",
    "Swift": "#F05138",
    "Kotlin": "#7F52FF",
    "PHP": "#4F5D95",
    "Dart": "#00B4AB",
    "HTML": "#E34C26",
    "CSS": "#563D7C",
    "Shell": "#89E051",
    # Extended
    "React": "#61DAFB",
    "Next.js": "#000000",
    "Tailwind CSS": "#38BDF8",
    "Framer Motion": "#E879F9",
    "Node.js": "#84CC16",
    "MongoDB": "#4DB33D",
    "PostgreSQL": "#336791",
    "Docker": "#2496ED",
    "FastAPI": "#05998B",
    "Django": "#092E20",
    "Redux": "#764ABC",
    "Firebase": "#FFCA28",
    "Supabase": "#3ECF8E",
    "Prisma": "#2D3748",
    "Three.js": "#FFFFFF",
    "GSAP": "#88CE02",
    "Vite": "#646CFF",
    "SQLAlchemy": "#D71F00",
    "Pydantic": "#E92063",
    "Stripe": "#635BFF",
    "OpenAI": "#10A37F",
    "LangChain": "#1C3C3C",
    "Redis": "#DC382D",
    "Express.js": "#FFFFFF",
    "JWT": "#FB015B",
    "SQLite": "#003B57",
    "WebSockets": "#9333EA",
    "Networking": "#0EA5E9",
    "Firewall": "#DC2626",
    "TLS": "#14B8A6",
    "DNS": "#F59E0B",
    "Figma": "#F24E1E",
}

# ---------------------------------------------------------------------------
# package.json dependency key → human-readable framework name
# ---------------------------------------------------------------------------

_PACKAGE_TO_TECH: dict[str, str | None] = {
    # Frontend
    "react": "React",
    "react-dom": None,
    "next": "Next.js",
    "vue": "Vue.js",
    "nuxt": "Nuxt",
    "@angular/core": "Angular",
    "svelte": "Svelte",
    "@sveltejs/kit": "SvelteKit",
    "solid-js": "SolidJS",
    "remix": "Remix",
    "astro": "Astro",
    # Styling
    "tailwindcss": "Tailwind CSS",
    "styled-components": "Styled Components",
    "@emotion/react": "Emotion",
    "sass": "Sass",
    # State
    "@reduxjs/toolkit": "Redux",
    "redux": "Redux",
    "zustand": "Zustand",
    # Backend
    "express": "Express.js",
    "fastify": "Fastify",
    "koa": "Koa",
    # Database
    "prisma": "Prisma",
    "@prisma/client": None,
    "mongoose": "MongoDB",
    "pg": "PostgreSQL",
    "postgres": "PostgreSQL",
    "mysql2": "MySQL",
    "redis": "Redis",
    "sqlite3": "SQLite",
    "better-sqlite3": "SQLite",
    # Auth
    "jsonwebtoken": "JWT",
    # Payments
    "stripe": "Stripe",
    # AI
    "openai": "OpenAI",
    "langchain": "LangChain",
    # Cloud
    "@supabase/supabase-js": "Supabase",
    "firebase": "Firebase",
    # Realtime
    "socket.io": "Socket.IO",
    "socket.io-client": None,
    "ws": "WebSockets",
    # UI
    "framer-motion": "Framer Motion",
    "react-toastify": "React-Toastify",
    # Animation / 3D
    "gsap": "GSAP",
    "three": "Three.js",
    # Tooling
    "vite": "Vite",
    "typescript": "TypeScript",
    # Ignore
    "axios": None,
    "lodash": None,
    "date-fns": None,
}

# ---------------------------------------------------------------------------
# requirements.txt package name → tech name
# ---------------------------------------------------------------------------

_REQUIREMENTS_TO_TECH: dict[str, str] = {
    "fastapi": "FastAPI",
    "django": "Django",
    "flask": "Flask",
    "starlette": "Starlette",
    "sqlalchemy": "SQLAlchemy",
    "pydantic": "Pydantic",
    "alembic": "Alembic",
    "celery": "Celery",
    "redis": "Redis",
    "psycopg2": "PostgreSQL",
    "asyncpg": "PostgreSQL",
    "pymongo": "MongoDB",
    "motor": "MongoDB",
    "uvicorn": "Uvicorn",
    "openai": "OpenAI",
    "langchain": "LangChain",
    "numpy": "NumPy",
    "pandas": "Pandas",
    "stripe": "Stripe",
    "boto3": "AWS SDK",
    "supabase": "Supabase",
    "firebase-admin": "Firebase",
    "jwt": "JWT",
    "python-jose": "JWT",
    # Networking
    "websockets": "WebSockets",
    "python-socketio": "Socket.IO",
    "sqlite": "SQLite",
    "aiosqlite": "SQLite",
    "pydivert": "Networking",
    "scapy": "Networking",
    "pyshark": "Networking",
    "cryptography": "TLS",
}

_NOISE_LANGUAGES = {
    "Makefile",
    "Dockerfile",
    "Shell",
    "Batchfile",
    "PowerShell",
    "SCSS",
}

# ---------------------------------------------------------------------------
# Topics → Tech
# ---------------------------------------------------------------------------

TOPIC_MAP = {
    "react": "React",
    "next": "Next.js",
    "nextjs": "Next.js",
    "tailwindcss": "Tailwind CSS",
    "vite": "Vite",
    "fastapi": "FastAPI",
    "django": "Django",
    "flask": "Flask",
    "postgresql": "PostgreSQL",
    "mongodb": "MongoDB",
    "sqlite": "SQLite",
    "docker": "Docker",
    "aws": "AWS",
    "websockets": "WebSockets",
    "typescript": "TypeScript",
    "javascript": "JavaScript",
    "python": "Python",
    "redis": "Redis",
    "firebase": "Firebase",
    "networking": "Networking",
    "firewall": "Firewall",
    "tls-sni": "TLS",
    "dns-blocking": "DNS",
    "windivert": "Networking",
    "deep-packet-inspection": "Networking",
    "multiprocessing": "Python",
    "redux": "Redux",
    "redux-toolkit": "Redux",
    "gsap": "GSAP",
    "framer-motion": "Framer Motion",
    "figma": "Figma",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _get_auth_headers() -> dict:
    token = settings.GITHUB_TOKEN

    if not token or token in ("your_github_token", "None", ""):
        return {"Accept": "application/vnd.github.v3+json"}

    return {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
    }


def _parse_gh_datetime(raw: str | None) -> datetime | None:
    if not raw:
        return None

    try:
        return datetime.fromisoformat(raw.replace("Z", "+00:00"))
    except Exception:
        return None


def _decode_github_file(response: requests.Response) -> str | None:
    if response.status_code != 200:
        return None

    try:
        return base64.b64decode(response.json()["content"]).decode("utf-8")
    except Exception:
        return None


def _extract_topics_as_tech(topics: list[str]) -> list[str]:
    result = []

    for topic in topics:
        normalized = topic.lower().strip()

        if normalized in TOPIC_MAP:
            tech = TOPIC_MAP[normalized]

            if tech not in result:
                result.append(tech)

    return result


def _parse_package_json(content: str) -> list[str]:
    try:
        pkg = json.loads(content)
    except Exception:
        return []

    deps = {}

    deps.update(pkg.get("dependencies", {}))
    deps.update(pkg.get("devDependencies", {}))

    result = []
    seen = set()

    for pkg_name in deps:
        if pkg_name in _PACKAGE_TO_TECH:
            tech = _PACKAGE_TO_TECH[pkg_name]

            if tech and tech not in seen:
                seen.add(tech)
                result.append(tech)

    return result


def _parse_requirements_txt(content: str) -> list[str]:
    result = []
    seen = set()

    for line in content.splitlines():
        line = line.strip()

        if not line or line.startswith("#"):
            continue

        pkg_name = re.split(r"[>=<!;\[]", line)[0].strip().lower()

        if pkg_name in _REQUIREMENTS_TO_TECH:
            tech = _REQUIREMENTS_TO_TECH[pkg_name]

            if tech and tech not in seen:
                seen.add(tech)
                result.append(tech)

    return result


# def _extract_readme_image(readme_text: str) -> str | None:
#     match = re.search(r"!\[[^\]]*\]\((https?://[^)\s]+)\)", readme_text)

#     if match:
#         return match.group(1)

#     match = re.search(r'<img[^>]+src=["\']?(https?://[^"\'>\s]+)', readme_text)

#     if match:
#         return match.group(1)

#     return None


def _og_image(username: str, repo_name: str) -> str:
    return f"https://opengraph.githubassets.com/1/{username}/{repo_name}"


def _derive_color(primary_language: str | None) -> str:
    return LANGUAGE_COLORS.get(primary_language or "", "#6E6E6E")


# ---------------------------------------------------------------------------
# Smart Tech Stack Detection
# ---------------------------------------------------------------------------


def _fetch_smart_tech_stack(
    username: str,
    repo_name: str,
    languages_url: str,
    primary_language: str | None,
    topics: list[str] | None = None,
) -> str:

    headers = _get_auth_headers()

    base_url = f"https://api.github.com/repos/{username}/{repo_name}/contents"

    tech: list[str] = []

    # Topics
    if topics:
        for t in _extract_topics_as_tech(topics):
            if t not in tech:
                tech.append(t)

    # package.json
    try:
        resp = requests.get(
            f"{base_url}/package.json",
            headers=headers,
            timeout=8,
        )

        content = _decode_github_file(resp)

        if content:
            for t in _parse_package_json(content):
                if t not in tech:
                    tech.append(t)

    except Exception as exc:
        logger.debug("package.json failed: %s", exc)

    # requirements.txt
    try:
        resp = requests.get(
            f"{base_url}/requirements.txt",
            headers=headers,
            timeout=8,
        )

        content = _decode_github_file(resp)

        if content:
            for t in _parse_requirements_txt(content):
                if t not in tech:
                    tech.append(t)

    except Exception as exc:
        logger.debug("requirements.txt failed: %s", exc)

    # Languages fallback
    if not tech:
        try:
            resp = requests.get(
                languages_url,
                headers=headers,
                timeout=8,
            )

            if resp.status_code == 200:
                languages = resp.json()

                tech = [l for l in languages if l not in _NOISE_LANGUAGES]

        except Exception as exc:
            logger.warning("Languages API failed: %s", exc)

    # Ensure primary language exists
    if primary_language and primary_language not in tech:
        tech.insert(0, primary_language)

    return ", ".join(tech[:8]) if tech else "Unknown"


# def _fetch_readme_image_sync(username: str, repo_name: str) -> str | None:

#     try:
#         url = f"https://api.github.com/repos/{username}/{repo_name}/readme"

#         resp = requests.get(
#             url,
#             headers=_get_auth_headers(),
#             timeout=8,
#         )

#         content = _decode_github_file(resp)

#         if content:
#             return _extract_readme_image(content)

#     except Exception as exc:
#         logger.debug("README fetch failed: %s", exc)

#     return None


# ---------------------------------------------------------------------------
# Automation Service
# ---------------------------------------------------------------------------


def _fetch_social_preview(username: str, repo_name: str) -> str:
    query = """
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        openGraphImageUrl
      }
    }
    """
    try:
        resp = requests.post(
            "https://api.github.com/graphql",
            headers=_get_auth_headers(),
            json={"query": query, "variables": {"owner": username, "name": repo_name}},
            timeout=8,
        )
        return resp.json()["data"]["repository"]["openGraphImageUrl"]
    except Exception:
        return _og_image(username, repo_name)


class AutomationService:
    @staticmethod
    def sync_github_repos(db: Session, github_username: str) -> dict:

        url = f"https://api.github.com/users/{github_username}/repos"

        params = {
            "per_page": 100,
            "sort": "pushed",
            "direction": "desc",
        }

        response = requests.get(
            url,
            headers=_get_auth_headers(),
            params=params,
        )

        repos = response.json()

        repos = [r for r in repos if not r.get("fork") and r.get("name")]

        created_count = 0
        updated_count = 0

        for repo in repos:
            name = repo["name"]

            primary_language = repo.get("language")

            tech_stack = _fetch_smart_tech_stack(
                github_username,
                name,
                repo["languages_url"],
                primary_language,
                repo.get("topics", []),
            )

            # readme_image = _fetch_readme_image_sync(github_username, name)

            # image_url = readme_image or _og_image(github_username, name)
            # github_repo_url = repo["html_url"]

            # Fetch the actual custom social preview set in GitHub repo Settings

            # image_url = _og_image(github_username, name)
            image_url = _fetch_social_preview(github_username, name)
            description = repo.get("description") or "Automated project sync"

            project_data = {
                "title": name,
                "tagline": description[:100],
                "description": description,
                "tech_stack": tech_stack,
                "github_link": repo["html_url"],
                "live_link": repo.get("homepage") or None,
                "image_url": image_url,
                "color": _derive_color(primary_language),
                "github_updated_at": _parse_gh_datetime(repo.get("pushed_at")),
                "order": 0,
                "featured": False,
            }

            existing = (
                db.query(Project)
                .filter(Project.github_link == repo["html_url"])
                .first()
            )

            if existing:
                for key, value in project_data.items():
                    if key in ("featured", "order"):
                        continue

                    setattr(existing, key, value)

                updated_count += 1

            else:
                db.add(Project(**project_data))

                created_count += 1

        try:
            db.commit()

        except Exception as exc:
            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=str(exc),
            )

        return {
            "status": "Sync Complete",
            "created": created_count,
            "updated": updated_count,
            "total": created_count + updated_count,
        }

    # ── Single-repo webhook sync (async) ─────────────────────────────────────

    @staticmethod
    async def sync_github_project(db: Session, repo_full_name: str, payload: dict):
        """Async single-repo sync triggered by GitHub push webhook."""
        username, repo_name = repo_full_name.split("/", 1)
        headers = _get_auth_headers()
        base_url = f"https://api.github.com/repos/{repo_full_name}/contents"

        import asyncio

        async with httpx.AsyncClient(timeout=10) as client:
            readme_res, lang_res, pkg_res, req_res = await asyncio.gather(
                client.get(
                    f"https://api.github.com/repos/{repo_full_name}/readme",
                    headers=headers,
                ),
                client.get(payload["repository"]["languages_url"], headers=headers),
                client.get(f"{base_url}/package.json", headers=headers),
                client.get(f"{base_url}/requirements.txt", headers=headers),
            )

        # ── Tech stack ────────────────────────────────────────────────────
        tech: list[str] = []
        repo = payload["repository"]
        primary_language = repo.get("language")

        if pkg_res.status_code == 200:
            try:
                raw = base64.b64decode(pkg_res.json()["content"]).decode("utf-8")
                tech.extend(_parse_package_json(raw))
            except Exception:
                pass

        if req_res.status_code == 200:
            try:
                raw = base64.b64decode(req_res.json()["content"]).decode("utf-8")
                for t in _parse_requirements_txt(raw):
                    if t not in tech:
                        tech.append(t)
            except Exception:
                pass

        if not tech and lang_res.status_code == 200:
            languages: dict[str, int] = lang_res.json()
            tech = [l for l in languages if l not in _NOISE_LANGUAGES]

        if primary_language and primary_language not in tech:
            tech.insert(0, primary_language)

        tech_stack = ", ".join(tech) if tech else "Unknown"

        # ── README image ──────────────────────────────────────────────────
        # readme_image: str | None = None
        # readme_text = ""
        # if readme_res.status_code == 200:
        #     try:
        #         readme_text = base64.b64decode(readme_res.json()["content"]).decode(
        #             "utf-8"
        #         )
        #         readme_image = _extract_readme_image(readme_text)
        #     except Exception:
        #         pass

        # Better tagline from README intro paragraph
        description = repo.get("description") or "Automated project sync"
        tagline = description[:100]
        if readme_res.status_code == 200:
            readme_text = base64.b64decode(readme_res.json()["content"]).decode("utf-8")
            m = re.search(r"^#.*?\n\n(.*?)\.", readme_text, re.DOTALL)
            if m:
                tagline = m.group(1).strip().replace("\n", " ")[:100]

        project_data = {
            "title": repo["name"],
            "tagline": tagline,
            "description": description,
            "tech_stack": tech_stack,
            "github_link": repo["html_url"],
            "live_link": repo.get("homepage") or None,
            "image_url": _og_image(username, repo_name),
            "color": _derive_color(primary_language),
            "github_updated_at": _parse_gh_datetime(repo.get("pushed_at")),
            "order": 0,
            "featured": False,
        }

        return ProjectRepository.upsert_project(db, project_data)

    # ── Webhook handler ───────────────────────────────────────────────────────

    @staticmethod
    async def handle_github_webhook(db: Session, body: bytes, signature: str):
        AutomationService._verify_signature(body, signature)
        import json as _json

        payload = _json.loads(body)
        target_branches = ["refs/heads/main", "refs/heads/master"]
        if payload.get("ref") in target_branches:
            await AutomationService.sync_github_project(
                db, payload["repository"]["full_name"], payload
            )

    @staticmethod
    def _verify_signature(body: bytes, signature_header: str):
        secret = settings.GITHUB_WEBHOOK_SECRET
        if not secret or secret == "your_created_secret":
            raise HTTPException(status_code=500, detail="Webhook secret not configured")
        if not signature_header:
            raise HTTPException(status_code=400, detail="Missing signature header")
        expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
        if not hmac.compare_digest(f"sha256={expected}", signature_header):
            raise HTTPException(status_code=401, detail="Invalid signature")
