from app.core.database import get_db
from app.service.automation_service import AutomationService
from fastapi import APIRouter, Depends, Header, Request
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/webhooks", tags=["Webhooks"])


@router.post("/github", summary="Receive a GitHub push webhook")
async def github_webhook(
    request: Request,
    x_hub_signature_256: str = Header(None),
    db: Session = Depends(get_db),
):
    body = await request.body()
    await AutomationService.handle_github_webhook(db, body, x_hub_signature_256)
    return {"status": "success"}


@router.post("/sync-all", summary="Manually trigger a full GitHub sync")
def sync_all_existing_repos(db: Session = Depends(get_db)):
    """
    Fetches all non-fork repos for the configured GitHub user, upserts them
    with full tech stacks and README screenshots.

    Safe to call repeatedly — manual curation (featured / order) is preserved.
    """
    return AutomationService.sync_github_repos(db, "naresh341")
