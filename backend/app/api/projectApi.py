from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.projectRepo import ProjectRepository
from app.schema.projectSchema import FeatureUpdateRequest, ProjectRequest
from app.service.media_service import MediaService
from app.service.projectService import ProjectService

router = APIRouter(prefix="/api/projects", tags=["Projects"])


@router.post("/create", summary="Manually create a project with an uploaded image")
async def create_project(
    image: UploadFile = File(...),
    request: ProjectRequest = Depends(),
    db: Session = Depends(get_db),
):
    upload_result = MediaService.upload_image(image)
    return ProjectRepository.create_project(
        db, project_data=request, image_url=upload_result["url"]
    )


@router.get("/", summary="List projects — featured first, latest as fallback")
def list_projects(db: Session = Depends(get_db)):
    return ProjectService.get_all_projects(db)


@router.patch(
    "/{project_id}/feature",
    summary="Mark a project as featured and set its display order",
    response_description="Updated project",
)
def feature_project(
    project_id: int,
    payload: FeatureUpdateRequest,
    db: Session = Depends(get_db),
):
    """
    Toggle the `featured` flag and optionally set the display `order`.

    Example — pin AxiomFlow at position 1:

        PATCH /api/projects/2/feature
        { "featured": true, "order": 1 }

    Example — unpin a project:

        PATCH /api/projects/2/feature
        { "featured": false }
    """
    updated = ProjectRepository.update_feature(
        db,
        project_id=project_id,
        featured=payload.featured,
        order=payload.order,
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated


@router.delete("/{project_id}", status_code=204, summary="Delete a project")
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    success = await ProjectService.remove_project(db, project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
