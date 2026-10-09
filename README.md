# Smart Office Management System

A full-stack web application for managing office operations, including employees, departments, attendance, leave requests, payroll, user roles, reports, and notifications.

## Project Overview

**Developed by:** Muskan Verma
**Degree:** B.Tech in Computer Science & Engineering

The Smart Office Management System is designed to simplify everyday office administration through a centralized web application.

## Technology Stack

* **Backend:** Python, FastAPI
* **Frontend:** React.js, Vite
* **Database:** PostgreSQL
* **ORM:** SQLAlchemy
* **Authentication:** JWT
* **Styling:** Tailwind CSS and custom CSS
* **Version Control:** Git and GitHub

## Features

* **Authentication:** JWT-based login and authentication.
* **Employee Management:** Manage employee records and perform CRUD operations.
* **Department Management:** Manage office departments.
* **Attendance Management:** Track employee attendance.
* **Leave Management:** Apply for leave and manage approval or rejection.
* **User & Role Management:** Manage users and role-based access.
* **Payroll Management:** Manage payroll records and net salary calculations.
* **Dashboard:** View office statistics and summary information.
* **Profile:** View account details.
* **Reports:** View employee, department, payroll, and leave summaries.
* **Notifications:** Display leave-related status updates based on existing leave records.

## Project Structure

```text
Smart-Office-Management-System/
├── backend/
├── frontend/
├── database/
├── docs/
├── screenshots/
├── requirements.txt
├── README.md
└── LICENSE
```

## Getting Started

### Prerequisites

Install the following before running the application:

* Python
* Node.js and npm
* PostgreSQL
* Git

### 1. Clone the repository

```bash
git clone https://github.com/MUSKAN4946/Smart-Office-Management-System-AI.git
cd Smart-Office-Management-System-AI
```

### 2. Set up the Python environment

Run these commands from the project root:

```bash
python -m venv venv
```

Activate the environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure PostgreSQL

* Make sure PostgreSQL is running.
* Create or select the project database.
* Configure the database connection using the project's existing backend configuration.
* Keep database credentials and secret keys out of GitHub.

### 4. Start the backend

From the project root:

```bash
cd backend
uvicorn app.main:app --reload
```

Open the API documentation:

http://127.0.0.1:8000/docs

### 5. Start the frontend

Open a **second terminal** from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local frontend URL printed by Vite, usually:

http://localhost:5173

## Testing

Verify the following application modules:

* Authentication and user roles
* Employee and department management
* Attendance management
* Leave application and status updates
* Payroll and profile
* Reports and notifications

API endpoints can be inspected using FastAPI Swagger UI.

## Project Status

The project has reached **Phase 49 — Reports and Notifications**. The current development work includes the modules listed above. Final end-to-end verification is the next step.

## Future Enhancements

Potential improvements include:

* AI-powered employee analytics
* Persistent notification records and additional notification types
* Email notifications
* Advanced reporting and data export
* Cloud deployment

## Author

**Muskan Verma**
B.Tech — Computer Science & Engineering

GitHub: https://github.com/MUSKAN4946/Smart-Office-Management-System-AI
