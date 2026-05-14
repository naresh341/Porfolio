from sqlalchemy import Column, DateTime, Integer, String, Text, Boolean
from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    tagline = Column(String)
    description = Column(Text)
    tech_stack = Column(String)
    github_link = Column(String, unique=True)
    live_link = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    color = Column(String, nullable=True, default="#6E6E6E")
    order = Column(Integer, default=0)
    featured = Column(Boolean, default=False, nullable=False)
    github_updated_at = Column(DateTime(timezone=True), nullable=True, index=True)
