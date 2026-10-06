from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Leave(Base):

    __tablename__ = "leaves"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False
    )

    leave_type = Column(
        String(50),
        nullable=False
    )

    start_date = Column(
        Date,
        nullable=False
    )

    end_date = Column(
        Date,
        nullable=False
    )

    reason = Column(
        String(500),
        nullable=False
    )

    status = Column(
        String(20),
        default="Pending",
        nullable=False
    )

    employee = relationship(
        "Employee",
        back_populates="leaves"
    )