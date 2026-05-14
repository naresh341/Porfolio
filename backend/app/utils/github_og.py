import hashlib


def generate_github_og_image(repo_url: str) -> str:
    if not repo_url:
        return ""
    try:
        clean_url = repo_url.rstrip("/")
        parts = clean_url.split("github.com/")[-1]  # e.g. "naresh341/DPI_WEB"
        stable_hash = hashlib.md5(parts.encode()).hexdigest()
        return f"https://opengraph.githubassets.com/{stable_hash}/{parts}"
    except Exception:
        return ""
