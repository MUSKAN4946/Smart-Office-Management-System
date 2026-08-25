from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.role_checker import admin_required

from app.database.database import get_db
from app.schemas.department_schema import (
    DepartmentCreate,
    DepartmentResponse
)


from app.services.department_service import (
    create_department,
    get_all_departments,
    update_department,
    delete_department
)




router = APIRouter(
    prefix="/departments",
    tags=["Departments"]
)


@router.post("/", response_model=DepartmentResponse)
def add_department(
    department: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return create_department(db, department)


@router.get("/", response_model=list[DepartmentResponse])
def fetch_departments(
    db: Session = Depends(get_db)
):
    return get_all_departments(db)



@router.put("/{department_id}", response_model=DepartmentResponse)
def edit_department(
    department_id: int,
    department: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return update_department(db, department_id, department)


@router.delete("/{department_id}")
def remove_department(
    department_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    result = delete_department(db, department_id)

    if result is None:
        return {
            "message": "Department Not Found"
        }

    return result