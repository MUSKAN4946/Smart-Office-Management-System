import { BrowserRouter, Routes, Route } from "react-router-dom";

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


function AppRoutes() {
    return (
        <BrowserRouter>
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
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;