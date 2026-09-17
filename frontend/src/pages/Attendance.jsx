import { useEffect, useState } from "react";

import {
    getAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance,
    filterAttendance
} from "../services/attendanceService";


function Attendance() {

    const [attendance, setAttendance] = useState([]);

    const [search, setSearch] = useState("");

    const [filterEmployeeId, setFilterEmployeeId] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [employeeId, setEmployeeId] = useState("");

    const [attendanceDate, setAttendanceDate] = useState("");

    const [checkIn, setCheckIn] = useState("");

    const [checkOut, setCheckOut] = useState("");

    const [status, setStatus] = useState("Present");


    // ===============================
    // LOAD ATTENDANCE
    // ===============================

    useEffect(() => {

        loadAttendance();

    }, []);


    const loadAttendance = async () => {

        try {

            const data = await getAttendance();

            setAttendance(data);

        } catch (error) {

            console.log("Attendance Error:", error);

            alert("Failed to load attendance");

        }

    };




    // ===============================
// FILTER ATTENDANCE
// ===============================

const handleFilterAttendance = async () => {

    try {

        const data = await filterAttendance(
            filterEmployeeId
                ? Number(filterEmployeeId)
                : null,
            filterStatus || null
        );

        setAttendance(data);

    } catch (error) {

        console.log(
            "Filter Attendance Error:",
            error
        );

        console.log(
            "Response:",
            error.response?.data
        );

        alert(
            error.response?.data?.detail ||
            "Failed to Filter Attendance"
        );

    }

};


// ===============================
// CLEAR FILTER
// ===============================

const handleClearFilters = async () => {

    setFilterEmployeeId("");

    setFilterStatus("");

    setSearch("");

    await loadAttendance();

};



    // ===============================
    // SAVE / UPDATE ATTENDANCE
    // ===============================

    const handleSaveAttendance = async () => {


        // ===============================
// FORM VALIDATION
// ===============================

if (!employeeId) {
    alert("Please enter Employee ID");
    return;
}

if (!attendanceDate) {
    alert("Please select Attendance Date");
    return;
}

if (!checkIn) {
    alert("Please select Check In time");
    return;
}

if (!status) {
    alert("Please select Attendance Status");
    return;
}


//console.log("Check In:", checkIn);
//console.log("Check Out:", checkOut);

if (checkOut) {
    const [checkInHour, checkInMinute] = checkIn.split(":").map(Number);
    const [checkOutHour, checkOutMinute] = checkOut.split(":").map(Number);

    const checkInTotalMinutes = checkInHour * 60 + checkInMinute;
    const checkOutTotalMinutes = checkOutHour * 60 + checkOutMinute;

    if (checkOutTotalMinutes <= checkInTotalMinutes) {
        alert("Check Out time must be later than Check In time");
        return;
    }
}




        try {

            const attendanceData = {

                employee_id: Number(employeeId),

                attendance_date: attendanceDate,

                check_in: checkIn,

                check_out: checkOut || null,

                status: status

            };


            // ===============================
            // UPDATE EXISTING ATTENDANCE
            // ===============================

            if (editingId) {

                await updateAttendance(
                    editingId,
                    attendanceData
                );

                alert("Attendance Updated Successfully");

            }

            // ===============================
            // ADD NEW ATTENDANCE
            // ===============================

            else {

                await addAttendance(
                    attendanceData
                );

                alert("Attendance Added Successfully");

            }


            // Reload attendance table

            await loadAttendance();


            // Close form

            setShowForm(false);


            // Reset form

            setEditingId(null);

            setEmployeeId("");

            setAttendanceDate("");

            setCheckIn("");

            setCheckOut("");

            setStatus("Present");


        } catch (error) {

            console.log(
                "Save / Update Attendance Error:",
                error
            );

            console.log(
                "Response:",
                error.response?.data
            );

            alert(
                error.response?.data?.detail ||
                "Failed to Save Attendance"
            );

        }

    };


    // ===============================
    // DELETE ATTENDANCE
    // ===============================

    const handleDeleteAttendance = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this attendance record?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteAttendance(id);

            alert("Attendance Deleted Successfully");


            // Reload attendance table

            await loadAttendance();


        } catch (error) {

            console.log(
                "Delete Attendance Error:",
                error
            );

            console.log(
                "Response:",
                error.response?.data
            );

            alert(
                error.response?.data?.detail ||
                "Failed to Delete Attendance"
            );

        }

    };


    // ===============================
    // EDIT ATTENDANCE
    // ===============================

    const handleEditAttendance = (record) => {

        setEditingId(record.id);

        setEmployeeId(record.employee_id);

        setAttendanceDate(record.attendance_date);

        setCheckIn(record.check_in);

        setCheckOut(record.check_out || "");

        setStatus(record.status);

        setShowForm(true);

    };


    // ===============================
    // CANCEL FORM
    // ===============================

    const handleCancel = () => {

        setShowForm(false);

        setEditingId(null);

        setEmployeeId("");

        setAttendanceDate("");

        setCheckIn("");

        setCheckOut("");

        setStatus("Present");

    };


    // ===============================
    // SEARCH
    // ===============================

    const filteredAttendance = attendance.filter((record) => {

        const searchText = search.toLowerCase();

        return (

            String(record.employee_id)
                .toLowerCase()
                .includes(searchText)

            ||

            String(record.attendance_date)
                .toLowerCase()
                .includes(searchText)

            ||

            String(record.status)
                .toLowerCase()
                .includes(searchText)

        );

    });


    return (

        <div
            style={{
                padding: "35px",
                background: "#f8fafc",
                minHeight: "100vh"
            }}
        >

            {/* ===============================
                PAGE TITLE
            =============================== */}

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "15px"
                }}
            >
                Attendance Management
            </h1>


            <hr />





            {/* ===============================
    SEARCH + FILTERS + ADD BUTTON
=============================== */}

<div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "20px 0",
        flexWrap: "wrap"
    }}
>

    {/* SEARCH */}

    <input
        type="text"
        placeholder="Search Attendance..."
        value={search}
        onChange={(e) =>
            setSearch(e.target.value)
        }
        style={{
            width: "250px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box"
        }}
    />


    {/* EMPLOYEE ID FILTER */}

    <input
        type="number"
        placeholder="Employee ID"
        value={filterEmployeeId}
        onChange={(e) =>
            setFilterEmployeeId(e.target.value)
        }
        style={{
            width: "150px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box"
        }}
    />


    {/* STATUS FILTER */}

    <select
        value={filterStatus}
        onChange={(e) =>
            setFilterStatus(e.target.value)
        }
        style={{
            width: "150px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box"
        }}
    >

        <option value="">
            All Status
        </option>

        <option value="Present">
            Present
        </option>

        <option value="Absent">
            Absent
        </option>

        <option value="Half Day">
            Half Day
        </option>

    </select>


    {/* FILTER BUTTON */}

    <button
        onClick={handleFilterAttendance}
        style={{
            backgroundColor: "#198754",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
        }}
    >
        Filter
    </button>


    {/* CLEAR BUTTON */}

    <button
        onClick={handleClearFilters}
        style={{
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
        }}
    >
        Clear
    </button>


    {/* ADD ATTENDANCE */}

    <button
        onClick={() => {

            setEditingId(null);

            setEmployeeId("");

            setAttendanceDate("");

            setCheckIn("");

            setCheckOut("");

            setStatus("Present");

            setShowForm(true);

        }}
        style={{
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginLeft: "auto"
        }}
    >
        + Add Attendance
    </button>

</div>


           







            {/* ===============================
                ADD / UPDATE ATTENDANCE FORM
            =============================== */}

            {showForm && (

                <div
                    style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.15)"
                    }}
                >

                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "25px"
                        }}
                    >
                        {editingId
                            ? "Update Attendance"
                            : "Add Attendance"
                        }
                    </h2>


                    {/* Employee ID */}

                    <input
                        type="number"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) =>
                            setEmployeeId(e.target.value)
                        }
                        style={inputStyle}
                    />

                    <br />
                    <br />


                    {/* Attendance Date */}

                    <input
                        type="date"
                        value={attendanceDate}
                        onChange={(e) =>
                            setAttendanceDate(e.target.value)
                        }
                        style={inputStyle}
                    />

                    <br />
                    <br />


                    {/* Check In */}

                    <input
                        type="time"
                        value={checkIn}
                        onChange={(e) =>
                            setCheckIn(e.target.value)
                        }
                        style={inputStyle}
                    />

                    <br />
                    <br />


                    {/* Check Out */}

                    <input
                        type="time"
                        value={checkOut}
                        onChange={(e) =>
                            setCheckOut(e.target.value)
                        }
                        style={inputStyle}
                    />

                    <br />
                    <br />


                    {/* Status */}

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        style={inputStyle}
                    >

                        <option value="Present">
                            Present
                        </option>

                        <option value="Absent">
                            Absent
                        </option>

                        <option value="Half Day">
                            Half Day
                        </option>

                    </select>


                    <br />
                    <br />


                    {/* Buttons */}

                    <div
                        style={{
                            textAlign: "center"
                        }}
                    >

                        <button
                            onClick={handleSaveAttendance}
                            style={{
                                backgroundColor: "#198754",
                                color: "white",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                marginRight: "10px"
                            }}
                        >
                            {editingId
                                ? "Update Attendance"
                                : "Save Attendance"
                            }
                        </button>


                        <button
                            onClick={handleCancel}
                            style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            )}


            {/* ===============================
                ATTENDANCE TABLE
            =============================== */}

            {filteredAttendance.length === 0 ? (

                <div
                    style={{
                        background: "white",
                        padding: "25px",
                        textAlign: "center",
                        borderRadius: "10px",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                >

                    <h3>
                        No Attendance Records Found
                    </h3>

                </div>

            ) : (

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                        background: "white",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.15)"
                    }}
                >

                    <thead
                        style={{
                            backgroundColor: "#0d6efd",
                            color: "white"
                        }}
                    >

                        <tr>

                            <th style={thStyle}>
                                ID
                            </th>

                            <th style={thStyle}>
                                Employee ID
                            </th>

                            <th style={thStyle}>
                                Date
                            </th>

                            <th style={thStyle}>
                                Check In
                            </th>

                            <th style={thStyle}>
                                Check Out
                            </th>

                            <th style={thStyle}>
                                Status
                            </th>

                            <th style={thStyle}>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredAttendance.map(
                            (record) => (

                                <tr key={record.id}>

                                    <td style={tdStyle}>
                                        {record.id}
                                    </td>

                                    <td style={tdStyle}>
                                        {record.employee_id}
                                    </td>

                                    <td style={tdStyle}>
                                        {record.attendance_date}
                                    </td>

                                    <td style={tdStyle}>
                                        {record.check_in}
                                    </td>

                                    <td style={tdStyle}>
                                        {record.check_out || "-"}
                                    </td>

                                    <td style={tdStyle}>
                                        {record.status}
                                    </td>


                                    {/* ACTIONS */}

                                    <td
                                        style={{
                                            textAlign: "center",
                                            borderBottom:
                                                "1px solid #f1f1f1",
                                            whiteSpace: "nowrap"
                                        }}
                                    >

                                        {/* EDIT */}

                                        <button
                                            onClick={() =>
                                                handleEditAttendance(
                                                    record
                                                )
                                            }
                                            style={{
                                                backgroundColor:
                                                    "#ffc107",
                                                color: "black",
                                                border: "none",
                                                padding:
                                                    "8px 12px",
                                                borderRadius:
                                                    "6px",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                                marginRight:
                                                    "8px"
                                            }}
                                        >
                                            Edit
                                        </button>


                                        {/* DELETE */}

                                        <button
                                            onClick={() =>
                                                handleDeleteAttendance(
                                                    record.id
                                                )
                                            }
                                            style={{
                                                backgroundColor:
                                                    "#dc3545",
                                                color: "white",
                                                border: "none",
                                                padding:
                                                    "8px 12px",
                                                borderRadius:
                                                    "6px",
                                                cursor: "pointer",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            )}

        </div>

    );

}


// ===============================
// STYLES
// ===============================

const inputStyle = {

    width: "100%",

    padding: "10px",

    borderRadius: "8px",

    border: "1px solid #ccc",

    boxSizing: "border-box"

};


const thStyle = {

    padding: "12px",

    textAlign: "center"

};


const tdStyle = {

    padding: "12px",

    textAlign: "center",

    borderBottom: "1px solid #f1f1f1"

};


export default Attendance;