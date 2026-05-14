from app.service.spotify_service import spotify_service
from fastapi import APIRouter

router = APIRouter(prefix="/spotify", tags=["spotify"])


@router.get("/now-playing")
async def now_playing():
    # Await the async service call
    return await spotify_service.get_now_playing()
