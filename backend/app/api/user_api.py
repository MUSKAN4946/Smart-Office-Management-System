from app.models.user import User
from app.utils.role_checker import admin_required

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.user_schema import (
    UserRegister,
    UserCreate,
    UserUpdate,
    UserResponse
)

from app.services.user_service import (
    register_user,
    login_user,
    create_managed_user,
    get_all_users,
    get_user_by_id,
    update_user,
    delete_user
)


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# =========================
# EXISTING REGISTRATION
# =========================

@router.post(
    "/register",
    response_model=UserResponse
)
def create_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    return register_user(db, user)


# =========================
# LOGIN
# =========================

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    result = login_user(
        db,
        form_data.username,
        form_data.password
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if result == "inactive":
        raise HTTPException(
            status_code=403,
            detail="User account is inactive"
        )

    if result is False:
        raise HTTPException(
            status_code=401,
            detail="Incorrect Password"
        )

  

    return {
        "access_token": result["access_token"],
        "token_type": result["token_type"],
        "user": {
            "id": result["user"].id,
            "full_name": result["user"].full_name,
            "email": result["user"].email,
            "role": result["user"].role
        }
    }


# =========================
# USER MANAGEMENT
# ADMIN ONLY
# =========================

@router.post(
    "/",
    response_model=UserResponse
)
def create_managed_user_api(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    new_user = create_managed_user(db, user)

    if new_user is None:
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists"
        )

    return new_user


@router.get(
    "/",
    response_model=list[UserResponse]
)
def fetch_all_users(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    return get_all_users(db)


@router.get(
    "/{user_id}",
    response_model=UserResponse
)
def fetch_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    user = get_user_by_id(db, user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.put(
    "/{user_id}",
    response_model=UserResponse
)
def edit_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    updated_user = update_user(
        db,
        user_id,
        user
    )

    if updated_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if updated_user == "duplicate_email":
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists"
        )

    return updated_user


@router.delete(
    "/{user_id}"
)
def remove_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    if current_user.id == user_id:
        raise HTTPException(
            status_code=400,
            detail="You cannot delete your own account"
        )

    deleted_user = delete_user(
        db,
        user_id
    )

    if deleted_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return deleted_user