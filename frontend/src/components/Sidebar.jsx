import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
    width: "260px",
    height: "100vh",
    background: "#1e3a8a",
    color: "white",
    padding: "25px 18px",
    position: "fixed",
    left: 0,
    top: 0,
    boxSizing: "border-box",
    overflowY: "auto",
    overflowX: "hidden"
}}
        >
            <h2
    style={{
        textAlign: "center",
        marginBottom: "25px",
        fontSize: "28px",
        fontWeight: "bold",
        whiteSpace: "nowrap"
    }}
>
    🏢 Smart Office
</h2>

            <hr
    style={{
        border: "1px solid rgba(255,255,255,0.2)",
        marginBottom: "25px"
    }}
/>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                <Link to="/dashboard" style={linkStyle}>
                    📊 Dashboard
                </Link>

               <Link to="/employees" style={linkStyle}>
                    👨 Employees
                </Link>

               <Link to="/departments" style={linkStyle}>
                    🏢 Departments
                </Link>

                <Link to="#" style={linkStyle}>
                    📅 Attendance
                </Link>

                <Link to="#" style={linkStyle}>
                    🌴 Leaves
                </Link>

                <Link to="#" style={linkStyle}>
                    💰 Payroll
                </Link>

                <Link to="#" style={linkStyle}>
                    📄 Reports
                </Link>

                <Link to="#" style={linkStyle}>
                    👤 Profile
                </Link>

                <Link to="#" style={linkStyle}>
                    🔔 Notifications
                </Link>

            </div>
        </div>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "17px"
};

export default Sidebar;