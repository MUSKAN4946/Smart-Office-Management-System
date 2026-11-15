
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen = false, onClose = () => {} }) {
    return (
        <>
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
                <h2 className="sidebar-title">
                    🏢 Smart Office
                </h2>

                <hr className="sidebar-divider" />

                <nav className="sidebar-links">
                    <Link to="/dashboard" onClick={onClose}>📊 Dashboard</Link>
                    <Link to="/employees" onClick={onClose}>👨 Employees</Link>
                    <Link to="/departments" onClick={onClose}>🏢 Departments</Link>
                    <Link to="/attendance" onClick={onClose}>📅 Attendance</Link>
                    <Link to="/users" onClick={onClose}>👤 User Management</Link>
                    <Link to="/leaves" onClick={onClose}>🌴 Leaves</Link>
                    <Link to="/payroll" onClick={onClose}>💰 Payroll</Link>
                    <Link to="/reports" onClick={onClose}>📄 Reports</Link>
                    <Link to="/profile" onClick={onClose}>👤 Profile</Link>
                    <Link to="/notifications" onClick={onClose}>🔔 Notifications</Link>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
