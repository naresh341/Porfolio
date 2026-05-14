from sqlalchemy.orm import Session

from app.models.projectModel import Project
from app.schema.projectSchema import ProjectRequest


class ProjectRepository:
    @staticmethod
    def create_project(db: Session, project_data: ProjectRequest, image_url: str):
        db_project = Project(**vars(project_data), image_url=image_url)
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def get_all_projects(db: Session) -> list[Project]:
        """
        Fetch strategy (in priority order):

        1. Featured projects sorted by `order ASC` — manual curated picks.
        2. If none are featured, fall back to the 3 most recently pushed repos
           sorted by `github_updated_at DESC`.

        This lets you curate your showcase without losing the automatic fallback.
        """
        featured = (
            db.query(Project)
            .filter(Project.featured == True)  # noqa: E712
            .order_by(Project.order.asc())
            .all()
        )
        if featured:
            return featured

        # Automatic fallback — latest 3 by real GitHub activity
        return (
            db.query(Project)
            .order_by(
                Project.github_updated_at.desc().nullslast(),
                Project.id.desc(),
            )
            .limit(3)
            .all()
        )

    @staticmethod
    def get_project_by_id(db: Session, project_id: int) -> Project | None:
        return db.query(Project).filter(Project.id == project_id).first()

    @staticmethod
    def update_feature(
        db: Session, project_id: int, featured: bool, order: int | None
    ) -> Project | None:
        project = ProjectRepository.get_project_by_id(db, project_id)
        if not project:
            return None
        project.featured = featured
        if order is not None:
            project.order = order
        db.commit()
        db.refresh(project)
        return project

    @staticmethod
    def delete_project(db: Session, project_id: int) -> bool:
        db_project = ProjectRepository.get_project_by_id(db, project_id)
        if db_project:
            db.delete(db_project)
            db.commit()
            return True
        return False

    @staticmethod
    def upsert_project(db: Session, data: dict) -> Project:
        db_project = (
            db.query(Project).filter(Project.github_link == data["github_link"]).first()
        )
        if db_project:
            for key, value in data.items():
                # Never overwrite manual curation fields during an auto-sync
                if key in ("featured", "order"):
                    continue
                setattr(db_project, key, value)
        else:
            db_project = Project(**data)
            db.add(db_project)
        try:
            db.commit()
            db.refresh(db_project)
            return db_project
        except Exception as e:
            db.rollback()
            raise e
