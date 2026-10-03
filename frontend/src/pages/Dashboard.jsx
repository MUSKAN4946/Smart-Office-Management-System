import { useEffect, useState } from "react";
import {
    getDashboard,
    getDepartmentEmployeeCount
} from "../services/dashboardService";

import DashboardCard from "../components/DashboardCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [dashboard, setDashboard] = useState(null);

    const [departmentData, setDepartmentData] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {
    try {
        const data = await getDashboard();
        setDashboard(data);

        const departmentCount = await getDepartmentEmployeeCount();
        setDepartmentData(departmentCount);

    } catch (error) {
        console.log(error);
        alert("Failed to load dashboard");
    }
};






    if (!dashboard) {
        return <h2>Loading Dashboard...</h2>;
    }

    const attendanceData = [
        {
            name: "Present",
            value: dashboard.present_today
        },
        {
            name: "Absent",
            value: dashboard.absent_today
        }
    ];



    return (

        <div
            style={{
                display: "flex"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    marginLeft: "260px",
                    background: "#f4f6f9",
                    minHeight: "100vh",
                    overflowX: "hidden"
                }}
            >

                <Navbar />

                <div
                    style={{
                        padding: "35px",
                        background: "#f4f6f9",
                        minHeight: "calc(100vh - 70px)",
                        width: "100%",
                        boxSizing: "border-box",
                        overflowX: "hidden"
                    }}
                >

                    <h1
                        style={{
                            marginBottom: "8px",
                            fontSize: "42px",
                            fontWeight: "700",
                            color: "#1e293b"
                        }}
                    >
                        Dashboard
                    </h1>

                    <h2
                        style={{
                            color: "#475569",
                            fontWeight: "500",
                            marginTop: "10px"
                        }}
                    >
                        Welcome, {user?.full_name} 👋
                    </h2>

                    <p>
                        Role : {user?.role}
                    </p>

                    <p>
                        {new Date().toLocaleDateString()}
                    </p>

                    {/* Main Statistics */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "25px",
                            marginTop: "35px"
                        }}
                    >

                        <DashboardCard
                            title="Total Employees"
                            value={dashboard.total_employees}
                        />

                        <DashboardCard
                            title="Active Employees"
                            value={dashboard.active_employees}
                        />

                        <DashboardCard
                            title="Inactive Employees"
                            value={dashboard.inactive_employees}
                        />

                        <DashboardCard
                            title="Departments"
                            value={dashboard.total_departments}
                        />

                        <DashboardCard
                            title="Total Attendance"
                            value={dashboard.total_attendance}
                        />

                        <DashboardCard
                            title="Present Today"
                            value={dashboard.present_today}
                        />

                        <DashboardCard
                            title="Absent Today"
                            value={dashboard.absent_today}
                        />

                        <DashboardCard
                            title="Total Leaves"
                            value={dashboard.total_leaves}
                        />

                        <DashboardCard
                            title="Pending Leaves"
                            value={dashboard.pending_leaves}
                        />

                        <DashboardCard
                            title="Approved Leaves"
                            value={dashboard.approved_leaves}
                        />

                        <DashboardCard
                            title="Rejected Leaves"
                            value={dashboard.rejected_leaves}
                        />

                        <DashboardCard
                            title="Total Payrolls"
                            value={dashboard.total_payrolls}
                        />

                        <DashboardCard
                            title="Total Users"
                            value={dashboard.total_users}
                        />

                    </div>


                    <div style={{
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    marginTop: "35px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
}}>
    <h2 style={{
        marginBottom: "20px",
        color: "#1e293b"
    }}>
        Today's Attendance
    </h2>

    {dashboard.present_today === 0 && dashboard.absent_today === 0 ? (
        <p style={{
            color: "#64748b",
            textAlign: "center",
            padding: "40px"
        }}>
            No attendance data available for today.
        </p>
    ) : (
        <ResponsiveContainer width="100%" height={320}>
            <PieChart>
                <Pie
                    data={attendanceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {attendanceData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                        />
                    ))}
                </Pie>

                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )}
</div>




<div style={{
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    marginTop: "35px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
}}>
    <h2 style={{
        marginBottom: "20px",
        color: "#1e293b"
    }}>
        Employees by Department
    </h2>

    {departmentData.length === 0 ? (
        <p style={{
            color: "#64748b",
            textAlign: "center",
            padding: "40px"
        }}>
            No department data available.
        </p>
    ) : (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="employee_count"
                    name="Employees"
                />
            </BarChart>
        </ResponsiveContainer>
    )}
</div>


                </div>

            </div>

        </div>

    );

}

export default Dashboard;