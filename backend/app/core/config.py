import os
from functools import lru_cache
from typing import List

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

env_type = os.getenv("ENV", "dev")
env_file_to_load = ".env.production" if env_type == "prod" else ".env"

load_dotenv(env_file_to_load, override=True)


class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio"
    ENV: str = env_type
    DEBUG: bool = False if env_type == "prod" else True
    # Database settings

    DATABASE_URL: str | None = None
    SECRET_KEY: str = "your_secret_key_here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Cloudinary settings
    CLOUDINARY_CLOUD_NAME: str | None = None
    CLOUDINARY_API_KEY: str | None = None
    CLOUDINARY_API_SECRET: str | None = None

    # CORS settings
    ALLOWED_ORIGINS: List[str] = []

    # Github settings
    GITHUB_WEBHOOK_SECRET: str | None = None
    GITHUB_TOKEN: str | None = None

    DISCORD_USER_ID: int | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="allow",
    )


@lru_cache()
def getSettings():
    return Settings()


settings = getSettings()
