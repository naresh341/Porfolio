import httpx
from app.core.config import settings


class SpotifyService:
    def __init__(self):
        self.base_url = "https://api.lanyard.rest/v1/users"

    async def get_now_playing(self):
        if not settings.DISCORD_USER_ID:
            return {"isPlaying": False, "message": "Discord User ID missing in .env"}

        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/{settings.DISCORD_USER_ID}"
                )
                data = response.json()

                if not data.get("success"):
                    return {"isPlaying": False}

                # Extract spotify specific data
                spotify = data["data"].get("spotify")

                if not spotify:
                    return {"isPlaying": False}

                return {
                    "isPlaying": True,
                    "title": spotify["song"],
                    "artist": spotify["artist"],
                    "album": spotify["album"],
                    "albumImageUrl": spotify["album_art_url"],
                    "songUrl": f"https://open.spotify.com/track/{spotify['track_id']}",
                }
            except Exception as e:
                print(f"Lanyard Fetch Error: {e}")
                return {"isPlaying": False}


spotify_service = SpotifyService()
