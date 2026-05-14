from dataclasses import dataclass
from typing import List, Optional

from fastapi import Form
from pydantic import BaseModel


class ProjectBase(BaseModel):
    title: str
    tagline: Optional[str] = None
    description: str
    tech_stack: str
    live_link: Optional[str] = None
    github_link: Optional[str] = None
    order: int = 0
    featured: bool = False


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: int
    image_url: Optional[str] = None
    color: Optional[str] = "#6E6E6E"
    github_updated_at: Optional[str] = None

    @property
    def tags(self) -> List[str]:
        return (
            [t.strip() for t in self.tech_stack.split(",")] if self.tech_stack else []
        )

    class Config:
        from_attributes = True


class FeatureUpdateRequest(BaseModel):
    """Payload for PATCH /api/projects/{id}/feature"""

    featured: bool
    order: Optional[int] = None  # if omitted the existing value is kept


@dataclass
class ProjectRequest:
    title: str = Form(...)
    tagline: Optional[str] = Form(None)
    description: str = Form(...)
    tech_stack: str = Form(...)
    live_link: Optional[str] = Form(None)
    github_link: Optional[str] = Form(None)
    order: int = Form(0)
    featured: bool = Form(False)
