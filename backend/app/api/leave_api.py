from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.leave_schema import (
    LeaveCreate,
    LeaveUpdate,
    LeaveResponse
)

from app.services.leave_service import (
    create_leave,
    get_all_leaves,
    get_leave_by_id,
    get_employee_leaves,
    update_leave,
    delete_leave,
    approve_leave,
    reject_leave
)

from app.utils.role_checker import (
    admin_required,
    hr_required,
    employee_required
)


router = APIRouter(
    prefix="/leaves",
    tags=["Leaves"]
)


# =========================
# CREATE LEAVE
# =========================

@router.post(
    "/",
    response_model=LeaveResponse
)
def create_leave_api(
    leave: LeaveCreate,
    db: Session = Depends(get_db),
    current_user=Depends(employee_required)
):

    return create_leave(db, leave)


# =========================
# GET ALL LEAVES
# =========================

@router.get(
    "/",
    response_model=list[LeaveResponse]
)
def fetch_all_leaves(
    db: Session = Depends(get_db),
    current_user=Depends(hr_required)
):

    return get_all_leaves(db)


# =========================
# GET EMPLOYEE LEAVES
# =========================

@router.get(
    "/employee/{employee_id}",
    response_model=list[LeaveResponse]
)
def fetch_employee_leaves(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(employee_required)
):

    return get_employee_leaves(
        db,
        employee_id
    )


# =========================
# GET LEAVE BY ID
# =========================

@router.get(
    "/{leave_id}",
    response_model=LeaveResponse
)
def fetch_leave_by_id(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(employee_required)
):

    leave = get_leave_by_id(
        db,
        leave_id
    )

    if leave is None:

        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    return leave


# =========================
# UPDATE LEAVE
# =========================

@router.put(
    "/{leave_id}",
    response_model=LeaveResponse
)
def edit_leave(
    leave_id: int,
    leave: LeaveUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(employee_required)
):

    updated_leave = update_leave(
        db,
        leave_id,
        leave
    )

    if updated_leave is None:

        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    return updated_leave


# =========================
# DELETE LEAVE
# =========================

@router.delete(
    "/{leave_id}"
)
def remove_leave(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(employee_required)
):

    deleted_leave = delete_leave(
        db,
        leave_id
    )

    if deleted_leave is None:

        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    return deleted_leave


# =========================
# APPROVE LEAVE
# =========================

@router.put(
    "/{leave_id}/approve",
    response_model=LeaveResponse
)
def approve_leave_api(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(hr_required)
):

    approved_leave = approve_leave(
        db,
        leave_id
    )

    if approved_leave is None:

        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    return approved_leave


# =========================
# REJECT LEAVE
# =========================

@router.put(
    "/{leave_id}/reject",
    response_model=LeaveResponse
)
def reject_leave_api(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(hr_required)
):

    rejected_leave = reject_leave(
        db,
        leave_id
    )

    if rejected_leave is None:

        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    return rejected_leave