import { useEffect, useState } from "react";
import API from "../api/axios";

function Reports() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [payrolls, setPayrolls] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            const token = localStorage.getItem("token");

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const [
                employeesResponse,
                departmentsResponse,
                leavesResponse,
                payrollResponse,
            ] = await Promise.all([
                API.get("/employees/", { headers }),
                API.get("/departments/", { headers }),
                API.get("/leaves/", { headers }),
                API.get("/payroll/", { headers }),
            ]);

            setEmployees(employeesResponse.data);
            setDepartments(departmentsResponse.data);
            setLeaves(leavesResponse.data);
            setPayrolls(payrollResponse.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h2>Loading Reports...</h2>
            </div>
        );
    }

    const totalPayroll = payrolls.reduce(
        (total, payroll) => total + Number(payroll.net_salary || 0),
        0
    );

    const pendingLeaves = leaves.filter(
        (leave) => leave.status === "Pending"
    ).length;

    const approvedLeaves = leaves.filter(
        (leave) => leave.status === "Approved"
    ).length;

    const rejectedLeaves = leaves.filter(
        (leave) => leave.status === "Rejected"
    ).length;

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
                padding: "40px",
                boxSizing: "border-box",
            }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <h1
    style={{
        textAlign: "center",
        color: "#1f2937",
        marginTop: "0",
        marginBottom: "18px",
        lineHeight: "1.3",
        paddingBottom: "4px",
        color: "#1f2937",
    }}
>
    Reports
</h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#6b7280",
                        marginBottom: "35px",
                    }}
                >
                    Overview of your Smart Office Management System
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                        marginBottom: "30px",
                    }}
                >
                    <div style={cardStyle}>
                        <h3>Total Employees</h3>
                        <p style={numberStyle}>{employees.length}</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>Total Departments</h3>
                        <p style={numberStyle}>{departments.length}</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>Total Payroll Records</h3>
                        <p style={numberStyle}>{payrolls.length}</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>Total Net Payroll</h3>
                        <p style={numberStyle}>
                            ₹{totalPayroll.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "14px",
                        padding: "25px",
                        boxShadow: "0 5px 18px rgba(0,0,0,0.06)",
                        border: "1px solid #e5e7eb",
                    }}
                >
                    <h2 style={{ color: "#1f2937" }}>
                        Leave Summary
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(180px, 1fr))",
                            gap: "15px",
                            marginTop: "20px",
                        }}
                    >
                        <div style={summaryStyle}>
                            <strong>Pending</strong>
                            <span>{pendingLeaves}</span>
                        </div>

                        <div style={summaryStyle}>
                            <strong>Approved</strong>
                            <span>{approvedLeaves}</span>
                        </div>

                        <div style={summaryStyle}>
                            <strong>Rejected</strong>
                            <span>{rejectedLeaves}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 5px 18px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
};

const numberStyle = {
    fontSize: "30px",
    fontWeight: "700",
    color: "#2563eb",
    margin: "15px 0 0",
};

const summaryStyle = {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
};

export default Reports;