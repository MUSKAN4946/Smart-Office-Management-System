from sqlalchemy.orm import Session

from app.models.attendance import Attendance
from app.schemas.attendance_schema import AttendanceCreate
from app.models.employee import Employee


def create_attendance(db: Session, attendance: AttendanceCreate):
    employee = db.query(Employee).filter(
        Employee.id == attendance.employee_id
    ).first()

    if employee is None:
        raise ValueError("Employee ID does not exist")


    existing_attendance = db.query(Attendance).filter(
        Attendance.employee_id == attendance.employee_id,
        Attendance.attendance_date == attendance.attendance_date
    ).first()

    if existing_attendance is not None:
        raise ValueError("Attendance already exists for this employee on this date")



    new_attendance = Attendance(
        employee_id=attendance.employee_id,
        attendance_date=attendance.attendance_date,
        check_in=attendance.check_in,
        check_out=attendance.check_out,
        status=attendance.status
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance


def get_all_attendance(db: Session):

    return db.query(Attendance).all()



def get_employee_attendance(
    db: Session,
    employee_email: str
):

    employee = db.query(Employee).filter(
        Employee.email == employee_email
    ).first()

    if employee is None:
        return []

    return db.query(Attendance).filter(
        Attendance.employee_id == employee.id
    ).all()

def filter_attendance(
    db: Session,
    employee_id: int | None = None,
    status: str | None = None
):

    query = db.query(Attendance)

    if employee_id is not None:
        query = query.filter(
            Attendance.employee_id == employee_id
        )

    if status is not None:
        query = query.filter(
            Attendance.status == status
        )

    return query.all()



def update_attendance(
    db: Session,
    attendance_id: int,
    attendance: AttendanceCreate
):

    existing_attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if existing_attendance is None:
        return None

    existing_attendance.employee_id = attendance.employee_id
    existing_attendance.attendance_date = attendance.attendance_date
    existing_attendance.check_in = attendance.check_in
    existing_attendance.check_out = attendance.check_out
    existing_attendance.status = attendance.status

    db.commit()
    db.refresh(existing_attendance)

    return existing_attendance



def delete_attendance(
    db: Session,
    attendance_id: int
):

    attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if attendance is None:
        return None

    db.delete(attendance)
    db.commit()

    return attendance

def update_attendance(
    db: Session,
    attendance_id: int,
    attendance: AttendanceCreate
):

    existing_attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if existing_attendance is None:
        return None

    existing_attendance.employee_id = attendance.employee_id
    existing_attendance.attendance_date = attendance.attendance_date
    existing_attendance.check_in = attendance.check_in
    existing_attendance.check_out = attendance.check_out
    existing_attendance.status = attendance.status

    db.commit()
    db.refresh(existing_attendance)

    return existing_attendance