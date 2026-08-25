import { useEffect, useState } from "react";
import {
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment
} from "../services/departmentService";

function Departments() {

    const [departments, setDepartments] = useState([]);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [departmentName, setDepartmentName] = useState("");

    const [departmentCode, setDepartmentCode] = useState("");

    const [description, setDescription] = useState("");

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {

        try {

            const data = await getDepartments();

            setDepartments(data);

        } catch (error) {

            console.log(error);

            alert("Failed to load departments");

        }

    };

    const clearForm = () => {

        setEditingId(null);

        setDepartmentName("");

        setDepartmentCode("");

        setDescription("");

        setShowForm(false);

    };

    const handleSaveDepartment = async () => {

        const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {

        await deleteDepartment(id);

        alert("Department Deleted Successfully");

        loadDepartments();

    } catch (error) {

        console.log(error);

        alert("Failed to Delete Department");

    }

};

        try {

            const departmentData = {

                department_name: departmentName,

                department_code: departmentCode,

                description: description

            };

            if (editingId) {

                await updateDepartment(editingId, departmentData);

                alert("Department Updated Successfully");

            } else {

                await addDepartment(departmentData);

                alert("Department Added Successfully");

            }

            clearForm();

            loadDepartments();

        } catch (error) {

            console.log(error);

            alert("Operation Failed");

        }

    };

    const handleEdit = (department) => {

        setEditingId(department.id);

        setDepartmentName(department.department_name);

        setDepartmentCode(department.department_code);

        setDescription(department.description);

        setShowForm(true);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmDelete) return;

        try {

            await deleteDepartment(id);

            alert("Department Deleted Successfully");

            loadDepartments();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

        return (

        <div
    style={{
        padding: "35px",
        background: "#f8fafc",
        minHeight: "100vh"
    }}
>

            <h1>Departments</h1>

            <hr />

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "25px 0"
                }}
            >

                <input
                    type="text"
                    placeholder=" Search Department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "320px",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "15px"
                    }}
                />

                <button
                    onClick={() => {

                        setEditingId(null);

                        setDepartmentName("");

                        setDepartmentCode("");

                        setDescription("");

                        setShowForm(true);

                    }}
                    style={{
                        backgroundColor: "#0d6efd",
                        color: "white",
                        border: "none",
                        padding: "12px 22px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "15px"
                    }}
                >
                    + Add Department
                </button>

            </div>

            {

                showForm && (

                    <div
                        style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "10px",
                            marginBottom: "25px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h2>

                            {

                                editingId

                                    ? "Update Department"

                                    : "Add Department"

                            }

                        </h2>

                        <input
                            type="text"
                            placeholder="Department Name"
                            value={departmentName}
                            onChange={(e) =>
                                setDepartmentName(e.target.value)
                            }
                            style={inputStyle}
                        />

                        <br /><br />

                        <input
                            type="text"
                            placeholder="Department Code"
                            value={departmentCode}
                            onChange={(e) =>
                                setDepartmentCode(e.target.value)
                            }
                            style={inputStyle}
                        />

                        <br /><br />

                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            style={inputStyle}
                        />

                        <br /><br />

                        <button
                            onClick={handleSaveDepartment}
                            style={{
                                backgroundColor: "#198754",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                marginRight: "10px",
                                fontWeight: "bold"
                            }}
                        >

                            {

                                editingId

                                    ? "Update Department"

                                    : "Save Department"

                            }

                        </button>

                        <button
                            onClick={clearForm}
                            style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            Cancel
                        </button>

                    </div>

                )

            }

                        {

                departments.length === 0

                ?

                (

                    <h3>No Departments Found</h3>

                )

                :

                (

                    <table
                      style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "20px",
                            background: "#fff",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
}}
                    >

                        <thead
                            style={{
                            background: "#0d6efd",
                            color: "#fff",
                            height: "55px",
                            fontSize: "16px"
}}
                        >

                            <tr>

                                <th style={thStyle}>ID</th>

                                <th style={thStyle}>Department Name</th>

                                <th style={thStyle}>Department Code</th>

                                <th style={thStyle}>Description</th>

                                <th style={thStyle}>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                departments

                                    .filter((department) =>

                                        department.department_name

                                            .toLowerCase()

                                            .includes(search.toLowerCase())

                                    )

                                    .map((department) => (

                                        <tr key={department.id}>

                                            <td style={tdStyle}>
                                                {department.id}
                                            </td>

                                            <td style={tdStyle}>
                                                {department.department_name}
                                            </td>

                                            <td style={tdStyle}>
                                                {department.department_code}
                                            </td>

                                            <td style={tdStyle}>
                                                {department.description}
                                            </td>

                                            <td style={tdStyle}>

                                                <button
                                                    onClick={() => handleEdit(department)}
                                                    style={{
                                                        backgroundColor: "#f59e0b",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "8px 15px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontWeight: "bold",
                                                        marginRight: "10px"
                                                    }}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(department.id)}
                                                    style={{
                                                        backgroundColor: "#ef4444",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "8px 15px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                )

            }

        </div>

    );

}

const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
};

const thStyle = {

    padding: "15px"

};

const tdStyle = {

    padding: "12px",

    textAlign: "center",

    borderBottom: "1px solid #f1f1f1"


};

export default Departments;