from pydantic import BaseModel, EmailStr
from datetime import datetime


class ContactBase(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactCreate(ContactBase):
    """Schema for creating a new contact entry."""

    pass


class ContactResponse(ContactBase):
    """Schema for sending data back to the frontend."""

    id: int
    created_at: datetime

    class Config:
        from_attributes = True
