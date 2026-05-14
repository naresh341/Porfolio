from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile
from app.repositories.projectRepo import ProjectRepository
from app.service.media_service import MediaService
from app.schema.projectSchema import ProjectRequest


class ProjectService:
    @staticmethod
    async def create_new_project(
        db: Session, request: ProjectRequest, image: UploadFile
    ):
        upload_result = MediaService.upload_image(image)
        image_url = upload_result.get("url")
        return ProjectRepository.create_project(
            db=db, project_data=request, image_url=image_url
        )

    @staticmethod
    def get_all_projects(db: Session):
        return ProjectRepository.get_all_projects(db)

    @staticmethod
    async def remove_project(db: Session, project_id: int):
        project = ProjectRepository.get_project_by_id(db, project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        if project.image_url:
            public_id = project.image_url.split("/")[-1].split(".")[0]
            MediaService.delete_image(f"portfolio/projects/{public_id}")
        return ProjectRepository.delete_project(db, project_id)
