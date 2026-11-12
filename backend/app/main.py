from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import (
    PROJECT_NAME,
    PROJECT_VERSION,
    FRONTEND_URLS
)
from app.database.database import Base, engine

# Models
from app.models.employee import Employee
from app.models.user import User
from app.models.attendance import Attendance
from app.models.leave import Leave
from app.models.department import Department
from app.models.payroll import Payroll


# APIs
from app.api.employee_api import router as employee_router
from app.api.user_api import router as user_router
from app.api.attendance_api import router as attendance_router
from app.api.leave_api import router as leave_router
from app.api.department_api import router as department_router
from app.api.payroll_api import router as payroll_router
from app.api.dashboard_api import router as dashboard_router
from app.api.report_api import router as report_router
from app.api.email_api import router as email_router
from app.api.profile_api import router as profile_router
from app.api.notification_api import router as notification_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=PROJECT_NAME,
    version=PROJECT_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        url.strip()
        for url in FRONTEND_URLS.split(",")
        if url.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register APIs
app.include_router(employee_router)
app.include_router(user_router)
app.include_router(attendance_router)
app.include_router(leave_router)
app.include_router(department_router)
app.include_router(payroll_router)
app.include_router(dashboard_router)
app.include_router(report_router)
app.include_router(email_router)
app.include_router(profile_router)
app.include_router(notification_router)



@app.get("/")
def home():
    return {
        "message": f"Welcome to {PROJECT_NAME}"
    }


@app.get("/database")
def database_check():
    try:
        connection = engine.connect()
        connection.close()

        return {
            "status": "Database Connected Successfully"
        }

    except Exception as e:
        return {
            "status": "Connection Failed",
            "error": str(e)
        }