from typing import Any

from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

from app import models, schemas, crud
from app.api import deps
from app.utils import send_test_email
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/test-email/", response_model=schemas.Msg, status_code=201)
def test_email(
    email_to: EmailStr,
    current_superuser: models.UserDB = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Test emails.
    """
    send_test_email(email_to=email_to)
    return {"msg": "Test email sent"}

@router.get("/is-user-admin/", status_code=200)
def test_if_this_user_is_admin(
    db: Session = Depends(deps.get_db),
    current_user: models.UserDB = Depends(deps.get_current_active_user),
) -> Any:
    """
    Test anything.
    """
    return crud.user.is_superuser(db=db, user=current_user)

@router.post("/test-any-logged-in/", status_code=200)
def test_any_logged_in_required(
    db: Session = Depends(deps.get_db),
    current_user: models.UserDB = Depends(deps.get_current_user),
) -> Any:
    """
    Test anything.
    """
    return {"msg": "Test request sent"}

@router.post("/test-any/", status_code=200)
def test_any_no_logged_in_required(
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Test anything.
    """
    return {"msg": "Test request sent"}