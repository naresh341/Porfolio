from app.api.projectApi import router as project_router
from app.api.webhooksApi import router as webhooks_router
from app.api.profile_api import router as profile_router
from app.api.spotify_api import router as spotify_router
from app.core.cloudinary_config import init_cloudinary
from app.core.database import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Naresh Portfolio")

app.include_router(project_router)
app.include_router(webhooks_router)
app.include_router(profile_router)
app.include_router(spotify_router)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    # allow_origins=settings.ALLOWED_ORIGINS,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    try:
        init_cloudinary()
        print("--- CLOUDINARY INITIALIZED ---")
        engine.connect()
        print("--- DATABASE CONNECTION SUCCESSFUL ---")
    except Exception as e:
        print(f"--- DATABASE CONNECTION FAILED: {e} ---")
        print(f"--- CLOUDINARY INITIALIZATION FAILED: {e} ---")


@app.get("/")
def read_root():
    return {"status": "Online", "database": "Connected"}
