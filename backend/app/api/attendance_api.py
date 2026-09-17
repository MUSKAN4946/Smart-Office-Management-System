from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.role_checker import (
    admin_required,
    employee_required
)
from app.database.database import get_db
from app.schemas.attendance_schema import (
    AttendanceCreate,
    AttendanceResponse
)
from app.services.attendance_service import (
    create_attendance,
    get_all_attendance,
    get_employee_attendance,
    filter_attendance,
    update_attendance,
    delete_attendance
)
router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.post("/", response_model=AttendanceResponse)
def add_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    try:
        return create_attendance(db, attendance)
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


@router.get("/", response_model=list[AttendanceResponse])
def fetch_attendance(
    db: Session = Depends(get_db)
):
    return get_all_attendance(db)




@router.get("/my", response_model=list[AttendanceResponse])
def fetch_my_attendance(
    db: Session = Depends(get_db),
    current_user=Depends(employee_required)
):

   return get_employee_attendance(
    db,
    current_user.email
)



@router.get("/filter", response_model=list[AttendanceResponse])
def fetch_filtered_attendance(
    employee_id: int | None = None,
    status: str | None = None,
    db: Session = Depends(get_db)
):
    return filter_attendance(
        db,
        employee_id,
        status
    )


@router.put("/{attendance_id}", response_model=AttendanceResponse)
def edit_attendance(
    attendance_id: int,
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return update_attendance(
        db,
        attendance_id,
        attendance
    )


@router.delete("/{attendance_id}")
def remove_attendance(
    attendance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    delete_attendance(
        db,
        attendance_id
    )

    return {
        "message": "Attendance Deleted Successfully"
    }