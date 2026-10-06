import React, { useEffect, useState } from "react";
import api from "../api/axios";

function LeaveManagement() {
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [employeeId, setEmployeeId] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    const fetchLeaves = async () => {
        try {
            const response = await api.get("/leaves/");
            setLeaves(response.data);
        } catch (error) {
            console.error("Error fetching leaves:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await api.get("/employees/");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };





    const handleSubmitLeave = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!employeeId) {
        alert("Please select an employee.");
        return;
    }

    if (!leaveType) {
        alert("Please select a leave type.");
        return;
    }

    if (!startDate) {
        alert("Please select a start date.");
        return;
    }

    if (!endDate) {
        alert("Please select an end date.");
        return;
    }

    if (!reason.trim()) {
        alert("Please enter a reason.");
        return;
    }

    // Date validation
    if (new Date(startDate) > new Date(endDate)) {
        alert("Start date cannot be after end date.");
        return;
    }

    try {
        await api.post("/leaves/", {
            employee_id: Number(employeeId),
            leave_type: leaveType,
            start_date: startDate,
            end_date: endDate,
            reason: reason.trim()
        });

        alert("Leave applied successfully!");

        setEmployeeId("");
        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setReason("");
        setShowForm(false);

        fetchLeaves();

    } catch (error) {
        console.error(error);
        alert("Failed to apply leave");
    }
};


const handleApproveLeave = async (leaveId) => {
    try {
        const response = await api.put(
            `/leaves/${leaveId}/approve`
        );

        setLeaves((prevLeaves) =>
            prevLeaves.map((leave) =>
                leave.id === leaveId
                    ? response.data
                    : leave
            )
        );

        alert("Leave approved successfully!");

    } catch (error) {
        console.error("Error approving leave:", error);

        alert(
            error.response?.data?.detail ||
            "Failed to approve leave."
        );
    }
};


const handleRejectLeave = async (leaveId) => {
    try {
        const response = await api.put(
            `/leaves/${leaveId}/reject`
        );

        setLeaves((prevLeaves) =>
            prevLeaves.map((leave) =>
                leave.id === leaveId
                    ? response.data
                    : leave
            )
        );

        alert("Leave rejected successfully!");

    } catch (error) {
        console.error("Error rejecting leave:", error);

        alert(
            error.response?.data?.detail ||
            "Failed to reject leave."
        );
    }
};






    useEffect(() => {
        fetchLeaves();
        fetchEmployees();
    }, []);

   const getEmployeeName = (employeeId) => {
    const employee = employees.find(
        (emp) => Number(emp.id) === Number(employeeId)
    );

    return employee
        ? employee.full_name
        : `Employee #${employeeId}`;
};

   const filteredLeaves = leaves.filter((leave) =>
    `${leave.id} ${leave.employee_id} ${getEmployeeName(leave.employee_id)} ${leave.leave_type} ${leave.reason} ${leave.status}`
        .toLowerCase()
        .includes(search.toLowerCase())
);




    const approvedCount = leaves.filter(
        (leave) => leave.status === "Approved"
    ).length;

    const rejectedCount = leaves.filter(
        (leave) => leave.status === "Rejected"
    ).length;

    const pendingCount = leaves.filter(
        (leave) => leave.status === "Pending"
    ).length;

    const getStatusStyle = (status) => {
        if (status === "Approved") {
            return {
                background: "#dcfce7",
                color: "#166534"
            };
        }

        if (status === "Rejected") {
            return {
                background: "#fee2e2",
                color: "#991b1b"
            };
        }

        return {
            background: "#fef3c7",
            color: "#92400e"
        };
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                padding: "30px",
                boxSizing: "border-box"
            }}
        >

            {/* PAGE HEADER */}

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: "32px",
                        fontWeight: "700",
                        color: "#111827"
                    }}
                >
                    Leave Management
                </h1>

                <p
                    style={{
                        margin: "8px 0 18px",
                        color: "#6b7280",
                        fontSize: "15px"
                    }}
                >
                    Manage and track employee leave requests.
                </p>



                <button
                    onClick={() => {
                        
                        setShowForm(true);
                    }}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "11px 22px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    + Apply Leave
                </button>


            </div>


            {/* STATISTICS */}


            {/* APPLY LEAVE FORM */}

{showForm && (
    <div
        style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}
    >

        <h2
            style={{
                marginTop: 0,
                marginBottom: "20px",
                fontSize: "20px",
                color: "#111827"
            }}
        >
            Apply for Leave
        </h2>


        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px"
            }}
        >

            {/* EMPLOYEE */}

            <div>

                <label style={formLabelStyle}>
                    Employee
                </label>

                <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    style={formInputStyle}
                >

                    <option value="">
                        Select Employee
                    </option>

                    {employees.map((employee) => (

                        <option
                            key={employee.id}
                            value={employee.id}
                        >
                            {employee.full_name} ({employee.employee_code})
                        </option>

                    ))}

                </select>

            </div>


            {/* LEAVE TYPE */}

            <div>

                <label style={formLabelStyle}>
                    Leave Type
                </label>

                <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    style={formInputStyle}
                >

                    <option value="">
                        Select Leave Type
                    </option>

                    <option value="Casual Leave">
                        Casual Leave
                    </option>

                    <option value="Medical Leave">
                        Medical Leave
                    </option>

                    <option value="Earned Leave">
                        Earned Leave
                    </option>

                    <option value="Emergency Leave">
                        Emergency Leave
                    </option>

                    <option value="Unpaid Leave">
                        Unpaid Leave
                    </option>

                </select>

            </div>


            {/* START DATE */}

            <div>

                <label style={formLabelStyle}>
                    Start Date
                </label>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={formInputStyle}
                />

            </div>


            {/* END DATE */}

            <div>

                <label style={formLabelStyle}>
                    End Date
                </label>

                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={formInputStyle}
                />

            </div>


            {/* REASON */}

            <div
                style={{
                    gridColumn: "1 / -1"
                }}
            >

                <label style={formLabelStyle}>
                    Reason
                </label>

                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason for leave..."
                    rows="3"
                    style={{
                        ...formInputStyle,
                        resize: "vertical"
                    }}
                />

            </div>

        </div>


        {/* FORM BUTTONS */}

        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px"
            }}
        >

            <button
                onClick={() => setShowForm(false)}
                style={{
                    background: "#6b7280",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontWeight: "600"
                }}
            >
                Cancel
            </button>


           <button
    onClick={handleSubmitLeave}
    style={{
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "7px",
        cursor: "pointer",
        fontWeight: "600"
    }}
>
    Submit Leave
</button>

        </div>

    </div>
)}



            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                    marginBottom: "25px"
                }}
            >

                <div style={statCardStyle}>
                    <p style={statLabelStyle}>Total Leaves</p>

                    <h2 style={totalNumberStyle}>
                        {leaves.length}
                    </h2>
                </div>


                <div style={statCardStyle}>
                    <p style={statLabelStyle}>Pending</p>

                    <h2
                        style={{
                            ...totalNumberStyle,
                            color: "#d97706"
                        }}
                    >
                        {pendingCount}
                    </h2>
                </div>


                <div style={statCardStyle}>
                    <p style={statLabelStyle}>Approved</p>

                    <h2
                        style={{
                            ...totalNumberStyle,
                            color: "#16a34a"
                        }}
                    >
                        {approvedCount}
                    </h2>
                </div>


                <div style={statCardStyle}>
                    <p style={statLabelStyle}>Rejected</p>

                    <h2
                        style={{
                            ...totalNumberStyle,
                            color: "#dc2626"
                        }}
                    >
                        {rejectedCount}
                    </h2>
                </div>

            </div>


            {/* LEAVE TABLE CARD */}

            <div
                style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    padding: "20px"
                }}
            >

                {/* TABLE HEADER */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}
                >

                    <h2
                        style={{
                            margin: 0,
                            fontSize: "20px",
                            color: "#111827"
                        }}
                    >
                        Leave Requests
                    </h2>


                    <input
                        type="text"
                        placeholder="Search leave..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "280px",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            outline: "none",
                            fontSize: "14px"
                        }}
                    />

                </div>


                {/* TABLE */}

                {loading ? (

                    <p
                        style={{
                            textAlign: "center",
                            padding: "40px",
                            color: "#6b7280"
                        }}
                    >
                        Loading leave records...
                    </p>

                ) : (

                    <div
                        style={{
                            width: "100%",
                            overflowX: "auto"
                        }}
                    >

                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                tableLayout: "fixed"
                            }}
                        >

                            <colgroup>
                                <col style={{ width: "7%" }} />
                                <col style={{ width: "12%" }} />
                                <col style={{ width: "14%" }} />
                                <col style={{ width: "13%" }} />
                                <col style={{ width: "13%" }} />
                                <col style={{ width: "16%" }} />
                                <col style={{ width: "11%" }} />
                                <col style={{ width: "14%" }} />
                            </colgroup>


                            <thead>

                                <tr
                                    style={{
                                        background: "#2563eb",
                                        color: "white"
                                    }}
                                >

                                    <th style={headerStyle}>
                                        ID
                                    </th>

                                    <th style={headerStyle}>
                                        Employee
                                    </th>

                                    <th style={headerStyle}>
                                        Leave Type
                                    </th>

                                    <th style={headerStyle}>
                                        Start Date
                                    </th>

                                    <th style={headerStyle}>
                                        End Date
                                    </th>

                                    <th style={headerStyle}>
                                        Reason
                                    </th>

                                    <th style={headerStyle}>
                                        Status
                                    </th>

                                    <th style={headerStyle}>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredLeaves.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            style={{
                                                textAlign: "center",
                                                padding: "30px",
                                                color: "#6b7280"
                                            }}
                                        >
                                            No leave records found.
                                        </td>

                                    </tr>

                                ) : (

                                    filteredLeaves.map((leave) => (

                                        <tr
                                            key={leave.id}
                                            style={{
                                                borderBottom:
                                                    "1px solid #e5e7eb"
                                            }}
                                        >

                                            <td style={cellStyle}>
                                                {leave.id}
                                            </td>


                                           <td style={cellStyle}>
                                                <div>
                                                    <div
                                                        style={{
                                                            fontWeight: "600",
                                                            color: "#111827"
                                                        }}
                                                    >
                                                        {getEmployeeName(leave.employee_id)}
                                                </div>

                                               <div
    style={{
        fontSize: "11px",
        color: "#6b7280",
        marginTop: "3px"
    }}
>
    {employees.find(
        (employee) => employee.id === leave.employee_id
    )?.employee_code || "N/A"}
</div>



                                            </div>
                                        </td>


                                            <td style={cellStyle}>
                                                {leave.leave_type}
                                            </td>


                                            <td style={cellStyle}>
                                                {leave.start_date}
                                            </td>


                                            <td style={cellStyle}>
                                                {leave.end_date}
                                            </td>


                                            <td style={cellStyle}>
                                                {leave.reason}
                                            </td>


                                            <td style={cellStyle}>

                                                <span
                                                    style={{
                                                        ...getStatusStyle(
                                                            leave.status
                                                        ),
                                                        display:
                                                            "inline-block",
                                                        padding:
                                                            "6px 12px",
                                                        borderRadius:
                                                            "20px",
                                                        fontSize: "12px",
                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    {leave.status}
                                                </span>

                                            </td>







<td style={cellStyle}>

    {leave.status === "Pending" ? (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px"
            }}
        >

            <button
                onClick={() => handleApproveLeave(leave.id)}
                style={{
                    background: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "7px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600"
                }}
            >
                Approve
            </button>

            <button
                onClick={() => handleRejectLeave(leave.id)}
                style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "7px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600"
                }}
            >
                Reject
            </button>

        </div>

    ) : (

        <span
            style={{
                fontSize: "12px",
                fontWeight: "600",
                color:
                    leave.status === "Approved"
                        ? "#16a34a"
                        : "#dc2626"
            }}
        >
            {leave.status}
        </span>

    )}

</td>




                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}


/* STAT CARD */

const statCardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    textAlign: "center"
};


/* STAT LABEL */

const statLabelStyle = {
    margin: 0,
    color: "#6b7280",
    fontSize: "15px"
};


/* STAT NUMBER */

const totalNumberStyle = {
    margin: "8px 0 0",
    fontSize: "28px",
    color: "#111827"
};


/* TABLE HEADER */

const headerStyle = {
    padding: "14px 8px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap"
};


/* TABLE CELL */

const cellStyle = {
    padding: "14px 8px",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: "13px",
    color: "#374151",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
};

const formLabelStyle = {
    display: "block",
    marginBottom: "7px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151"
};

const formInputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    fontSize: "14px",
    outline: "none",
    background: "white"
};


export default LeaveManagement;