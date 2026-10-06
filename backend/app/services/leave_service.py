from sqlalchemy.orm import Session

from app.models.leave import Leave
from app.schemas.leave_schema import LeaveCreate, LeaveUpdate


def create_leave(db: Session, leave: LeaveCreate):

    new_leave = Leave(
        employee_id=leave.employee_id,
        leave_type=leave.leave_type,
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason,
        status="Pending"
    )

    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)

    return new_leave


def get_all_leaves(db: Session):

    return db.query(Leave).order_by(Leave.id).all()


def get_leave_by_id(db: Session, leave_id: int):

    return db.query(Leave).filter(
        Leave.id == leave_id
    ).first()


def get_employee_leaves(db: Session, employee_id: int):

    return db.query(Leave).filter(
        Leave.employee_id == employee_id
    ).order_by(Leave.id).all()


def update_leave(
    db: Session,
    leave_id: int,
    leave: LeaveUpdate
):

    existing_leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if not existing_leave:
        return None

    existing_leave.leave_type = leave.leave_type
    existing_leave.start_date = leave.start_date
    existing_leave.end_date = leave.end_date
    existing_leave.reason = leave.reason

    db.commit()
    db.refresh(existing_leave)

    return existing_leave


def delete_leave(db: Session, leave_id: int):

    existing_leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if not existing_leave:
        return None

    db.delete(existing_leave)
    db.commit()

    return {
        "message": "Leave deleted successfully"
    }


def approve_leave(db: Session, leave_id: int):

    existing_leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if not existing_leave:
        return None

    existing_leave.status = "Approved"

    db.commit()
    db.refresh(existing_leave)

    return existing_leave


def reject_leave(db: Session, leave_id: int):

    existing_leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if not existing_leave:
        return None

    existing_leave.status = "Rejected"

    db.commit()
    db.refresh(existing_leave)

    return existing_leave