import { useEffect, useState } from "react";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../services/userService.js";


function Users() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        role: "Employee",
        is_active: true
    });


    // =========================
    // LOAD USERS
    // =========================

    const loadUsers = async () => {

        try {

            const data = await getUsers();

            setUsers(data);

        } catch (error) {

            console.error("Error loading users:", error);

            alert(
                error.response?.data?.detail ||
                "Failed to load users"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadUsers();

    }, []);


    // =========================
    // FORM CHANGE
    // =========================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]:
                name === "is_active"
                    ? value === "true"
                    : value
        }));

    };


    // =========================
    // CREATE / UPDATE USER
    // =========================

    const handleSubmit = async (event) => {

        event.preventDefault();


        try {

            if (editingId) {

                await updateUser(
                    editingId,
                    {
                        full_name: form.full_name,
                        email: form.email,
                        role: form.role,
                        is_active: form.is_active
                    }
                );

                alert("User updated successfully!");

            } else {

                await createUser({
                    full_name: form.full_name,
                    email: form.email,
                    password: form.password,
                    role: form.role,
                    is_active: form.is_active
                });

                alert("User created successfully!");

            }


            resetForm();

            await loadUsers();


        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Operation failed"
            );

        }

    };


    // =========================
    // EDIT USER
    // =========================

    const handleEdit = (user) => {

        setEditingId(user.id);

        setForm({
            full_name: user.full_name,
            email: user.email,
            password: "",
            role: user.role,
            is_active: user.is_active
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================
    // DELETE USER
    // =========================

    const handleDelete = async (userId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteUser(userId);

            alert("User deleted successfully!");

            await loadUsers();


        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to delete user"
            );

        }

    };


    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {

        setEditingId(null);

        setForm({
            full_name: "",
            email: "",
            password: "",
            role: "Employee",
            is_active: true
        });

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div style={styles.loading}>

                Loading users...

            </div>
        );

    }


    // =========================
    // PAGE
    // =========================

    return (

        <div style={styles.page}>

            {/* PAGE TITLE */}

            <h1 style={styles.title}>
                User Management
            </h1>


            {/* =========================
                CREATE / EDIT USER
            ========================= */}

            <div style={styles.formCard}>

                <h2 style={styles.sectionTitle}>

                    {editingId
                        ? "Edit User"
                        : "Create User"}

                </h2>


                <form onSubmit={handleSubmit}>

                    <div style={styles.formGrid}>


                        {/* FULL NAME */}

                        <input
                            type="text"
                            name="full_name"
                            placeholder="Full Name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />


                        {/* EMAIL */}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />


                        {/* PASSWORD */}

                        {!editingId && (

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />

                        )}


                        {/* ROLE */}

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            style={styles.input}
                        >

                            <option value="Employee">
                                Employee
                            </option>

                            <option value="HR">
                                HR
                            </option>

                            <option value="Admin">
                                Admin
                            </option>

                        </select>


                        {/* STATUS */}

                        {editingId && (

                            <select
                                name="is_active"
                                value={String(form.is_active)}
                                onChange={handleChange}
                                style={styles.input}
                            >

                                <option value="true">
                                    Active
                                </option>

                                <option value="false">
                                    Inactive
                                </option>

                            </select>

                        )}

                    </div>


                    {/* BUTTONS */}

                    <div style={styles.buttonContainer}>

                        <button
                            type="submit"
                            style={styles.createButton}
                        >

                            {editingId
                                ? "Update User"
                                : "Create User"}

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                onClick={resetForm}
                                style={styles.cancelButton}
                            >

                                Cancel

                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* =========================
                ALL USERS
            ========================= */}

            <div style={styles.tableCard}>

                <h2 style={styles.sectionTitle}>
                    All Users
                </h2>


                <div style={styles.tableWrapper}>

                    <table style={styles.table}>

                        {/* SIX COLUMNS */}

                        <colgroup>

                            <col style={{ width: "8%" }} />

                            <col style={{ width: "20%" }} />

                            <col style={{ width: "32%" }} />

                            <col style={{ width: "14%" }} />

                            <col style={{ width: "13%" }} />

                            <col style={{ width: "13%" }} />

                        </colgroup>


                        <thead>

                            <tr style={styles.headerRow}>

                                <th style={styles.th}>
                                    ID
                                </th>

                                <th style={styles.th}>
                                    Full Name
                                </th>

                                <th style={styles.th}>
                                    Email
                                </th>

                                <th style={styles.th}>
                                    Role
                                </th>

                                <th style={styles.th}>
                                    Status
                                </th>

                                <th style={styles.th}>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user.id}
                                    style={styles.row}
                                >

                                    {/* ID */}

                                    <td style={styles.td}>
                                        {user.id}
                                    </td>


                                    {/* FULL NAME */}

                                    <td style={styles.td}>
                                        {user.full_name}
                                    </td>


                                    {/* EMAIL */}

                                    <td style={styles.td}>
                                        {user.email}
                                    </td>


                                    {/* ROLE */}

                                    <td style={styles.td}>

                                        <span
                                            style={{
                                                ...styles.roleBadge,
                                                background:
                                                    user.role === "Admin"
                                                        ? "#dbeafe"
                                                        : user.role === "HR"
                                                            ? "#fef3c7"
                                                            : "#e0e7ff",
                                                color:
                                                    user.role === "Admin"
                                                        ? "#1d4ed8"
                                                        : user.role === "HR"
                                                            ? "#92400e"
                                                            : "#4338ca"
                                            }}
                                        >

                                            {user.role}

                                        </span>

                                    </td>


                                    {/* STATUS */}

                                    <td style={styles.td}>

                                        <span
                                            style={{
                                                ...styles.status,
                                                background:
                                                    user.is_active
                                                        ? "#dcfce7"
                                                        : "#fee2e2",
                                                color:
                                                    user.is_active
                                                        ? "#166534"
                                                        : "#991b1b"
                                            }}
                                        >

                                            {user.is_active
                                                ? "Active"
                                                : "Inactive"}

                                        </span>

                                    </td>


                                    {/* ACTIONS */}

                                    <td style={styles.td}>

                                        <div style={styles.actionContainer}>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(user)
                                                }
                                                style={styles.editButton}
                                            >

                                                Edit

                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                style={styles.deleteButton}
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}


                            {users.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="6"
                                        style={styles.noUsers}
                                    >

                                        No users found.

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}


/* =========================
   STYLES
========================= */

const styles = {

    page: {

        padding: "30px",

        background: "#f8fafc",

        minHeight: "100vh",

        width: "100%",

        boxSizing: "border-box"

    },


    loading: {

        padding: "30px",

        fontSize: "20px",

        background: "#f8fafc",

        minHeight: "100vh"

    },


    title: {

        fontSize: "36px",

        color: "#1e293b",

        marginBottom: "30px",

        textAlign: "center"

    },


    formCard: {

        background: "white",

        padding: "30px",

        borderRadius: "12px",

        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",

        marginBottom: "30px"

    },


    tableCard: {

        background: "white",

        padding: "30px",

        borderRadius: "12px",

        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"

    },


    sectionTitle: {

        marginTop: 0,

        marginBottom: "25px",

        color: "#1e293b",

        textAlign: "center"

    },


    formGrid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "15px"

    },


    input: {

        padding: "12px",

        border: "1px solid #cbd5e1",

        borderRadius: "8px",

        fontSize: "15px",

        outline: "none",

        boxSizing: "border-box",

        width: "100%"

    },


    buttonContainer: {

        display: "flex",

        justifyContent: "center",

        gap: "12px",

        marginTop: "20px"

    },


    createButton: {

        padding: "12px 24px",

        background: "#1e3a8a",

        color: "white",

        border: "none",

        borderRadius: "8px",

        fontSize: "15px",

        cursor: "pointer",

        fontWeight: "600"

    },


    cancelButton: {

        padding: "12px 24px",

        background: "#64748b",

        color: "white",

        border: "none",

        borderRadius: "8px",

        fontSize: "15px",

        cursor: "pointer",

        fontWeight: "600"

    },


    tableWrapper: {

        width: "100%",

        overflowX: "auto"

    },


    table: {

        width: "100%",

        minWidth: "900px",

        borderCollapse: "collapse",

        tableLayout: "fixed"

    },


    headerRow: {

        background: "#eaf0f6"

    },


    th: {

        padding: "14px 10px",

        textAlign: "center",

        color: "#334155",

        borderBottom: "2px solid #cbd5e1",

        fontWeight: "700",

        fontSize: "14px"

    },


    td: {

        padding: "15px 10px",

        textAlign: "center",

        borderBottom: "1px solid #e2e8f0",

        color: "#475569",

        verticalAlign: "middle",

        wordBreak: "break-word"

    },


    row: {

        background: "white"

    },


    roleBadge: {

        display: "inline-block",

        padding: "5px 10px",

        borderRadius: "20px",

        fontSize: "13px",

        fontWeight: "600"

    },


    status: {

        display: "inline-block",

        padding: "5px 10px",

        borderRadius: "20px",

        fontSize: "13px",

        fontWeight: "600"

    },


    actionContainer: {

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        gap: "8px",

        flexWrap: "nowrap"

    },


    editButton: {

        background: "#f59e0b",

        color: "white",

        border: "none",

        padding: "7px 14px",

        borderRadius: "6px",

        cursor: "pointer",

        fontWeight: "600",

        whiteSpace: "nowrap"

    },


    deleteButton: {

        background: "#dc3545",

        color: "white",

        border: "none",

        padding: "7px 14px",

        borderRadius: "6px",

        cursor: "pointer",

        fontWeight: "600",

        whiteSpace: "nowrap"

    },


    noUsers: {

        padding: "30px",

        textAlign: "center",

        color: "#64748b"

    }

};


export default Users;