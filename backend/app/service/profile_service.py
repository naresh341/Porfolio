import os
import shutil
from datetime import datetime

from app.models.contact_model import Contact
from app.schema.contact_schema import ContactCreate
from fastapi import HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session  # Corrected Import


class ProfileService:
    def __init__(self):
        # Tip: Use an absolute path or ensure the root dir is correct for production
        self.upload_dir = "static"
        self.internal_resume = "resume.pdf"
        self.resume_path = os.path.join(self.upload_dir, self.internal_resume)

    def get_resume_file(self) -> FileResponse:
        """Logic to prepare the dynamic resume file."""
        if not os.path.exists(self.resume_path):
            raise HTTPException(
                status_code=404, detail="Resume file not found on server"
            )

        # Dynamic naming logic
        date_str = datetime.now().strftime("%b_%Y")
        display_name = f"Naresh_Bhati_Full_Stack_Developer_{date_str}.pdf"

        return FileResponse(
            path=self.resume_path, media_type="application/pdf", filename=display_name
        )

    def update_resume_file(self, file: UploadFile) -> dict:
        """Logic for saving a new resume."""
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400, detail="Invalid file type. Please upload a PDF."
            )

        try:
            os.makedirs(self.upload_dir, exist_ok=True)
            with open(self.resume_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            return {"message": "Resume updated successfully"}
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Failed to save file: {str(e)}"
            )

    def process_contact_form(self, db: Session, contact_data: ContactCreate):
        """Saves the contact message to the database with error handling."""
        try:
            new_entry = Contact(
                name=contact_data.name,
                email=contact_data.email,
                message=contact_data.message,
            )
            db.add(new_entry)
            db.commit()
            db.refresh(new_entry)
            return new_entry
        except Exception as e:
            db.rollback()  # Crucial: roll back if the database save fails
            print(f"Database Error: {e}")
            raise HTTPException(
                status_code=500, detail="Could not save contact message"
            )


profile_service = ProfileService()
