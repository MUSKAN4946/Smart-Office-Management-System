from sqlalchemy import Column, Integer, String
from app.database.database import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)

    department_name = Column(String(100), unique=True, nullable=False)

    department_code = Column(String(20), unique=True, nullable=False)

    description = Column(String(255), nullable=True)