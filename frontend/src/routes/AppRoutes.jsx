
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Departments from "../pages/Departments";
import Attendance from "../pages/Attendance";
import Users from "../pages/users.jsx";
import LeaveManagement from "../pages/LeaveManagement";
import PayrollManagement from "../pages/PayrollManagement";
import Profile from "../pages/Profile";
import Reports from "../pages/Reports";
import Notifications from "../pages/Notifications";
import Register from "../pages/Register";

function BackToDashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    const hideButton = [
        "/",
        "/login",
        "/register",
        "/dashboard"
    ].includes(location.pathname);

    if (hideButton) return null;

    return (
        <div style={{
            width: "100%",
            padding: "12px 20px",
            boxSizing: "border-box",
            background: "#f4f6f9"
        }}>
            <button
                onClick={() => navigate("/dashboard")}
                style={{
                    backgroundColor: "#0d6efd",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold"
                }}
            >
                ← Back to Dashboard
            </button>
        </div>
    );
}

function AppRoutesContent() {
    return (
        <>
            <BackToDashboard />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/users" element={<Users />} />
                <Route path="/leaves" element={<LeaveManagement />} />
                <Route path="/payroll" element={<PayrollManagement />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <AppRoutesContent />
        </BrowserRouter>
    );
}

export default AppRoutes;
