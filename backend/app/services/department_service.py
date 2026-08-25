from sqlalchemy.orm import Session

from app.models.department import Department
from app.schemas.department_schema import DepartmentCreate


def create_department(db: Session, department: DepartmentCreate):

    new_department = Department(
        department_name=department.department_name,
        department_code=department.department_code,
        description=department.description
    )

    db.add(new_department)
    db.commit()
    db.refresh(new_department)

    return new_department


def get_all_departments(db: Session):

    return db.query(Department).all()


def update_department(db: Session, department_id: int, department: DepartmentCreate):

    existing_department = db.query(Department).filter(
        Department.id == department_id
    ).first()

    if not existing_department:
        return None

    existing_department.department_name = department.department_name
    existing_department.department_code = department.department_code
    existing_department.description = department.description

    db.commit()
    db.refresh(existing_department)

    return existing_department



def delete_department(db: Session, department_id: int):

    department = db.query(Department).filter(
        Department.id == department_id
    ).first()

    if department:

        db.delete(department)

        db.commit()

    return {
        "message": "Department Deleted Successfully"
    }