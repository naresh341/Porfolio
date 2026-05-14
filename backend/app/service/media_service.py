import cloudinary.uploader
from fastapi import HTTPException, UploadFile


class MediaService:
    @staticmethod
    def upload_image(file: UploadFile, folder: str = "portfolio/projects"):
        try:
            upload_result = cloudinary.uploader.upload(
                file.file, folder=folder, resource_type="image"
            )
            return {
                "url": upload_result.get("secure_url"),
                "public_id": upload_result.get("public_id"),
            }
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Cloudinary upload failed: {str(e)}"
            )

    @staticmethod
    def delete_image(public_id: str):
        cloudinary.uploader.destroy(public_id)
