from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schema.contact_schema import ContactCreate, ContactResponse
from app.service.profile_service import profile_service

router = APIRouter(prefix="/api", tags=["Profile"])


@router.get("/resume/download")
async def download_resume():
    return profile_service.get_resume_file()


@router.post("/contact", response_model=ContactResponse)
async def contact_me(data: ContactCreate, db: Session = Depends(get_db)):
    return profile_service.process_contact_form(db, data)


@router.post("/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    return profile_service.update_resume_file(file)
