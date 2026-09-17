import { useEffect, useState } from "react";

import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} from "../services/employeeService";

function Employees() {

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);


    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [department, setDepartment] = useState("");

    const [designation, setDesignation] = useState("");

    const [salary, setSalary] = useState("");

    const [employeeCode, setEmployeeCode] = useState("");

    const [phone, setPhone] = useState("");

    const [joiningDate, setJoiningDate] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {

        try {

            const data = await getEmployees();
            setEmployees(data);

        } catch (error) {

            console.log(error);
            alert("Failed to load employees");

        }

    };




    const handleSaveEmployee = async () => {

    try {

        const employeeData = {
            employee_code: employeeCode,
            full_name: fullName,
            email: email,
            phone: phone,
            department: department,
            designation: designation,
            joining_date: joiningDate,
            salary: parseFloat(salary)
        };

        if (editingId) {

    await updateEmployee(editingId, employeeData);

    alert("Employee Updated Successfully");

} else {

    await addEmployee(employeeData);


}


        alert("Employee Added Successfully");

        loadEmployees();

        setEditingId(null);

        setShowForm(false);

        setFullName("");
        setEmail("");
        setDepartment("");
        setDesignation("");
        setSalary("");
        setEmployeeCode("");
        setPhone("");
        setJoiningDate("");

    } catch (error) {

        console.log(error);

        alert("Failed to Add Employee");

    }

};


const handleDeleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await deleteEmployee(id);

        alert("Employee Deleted Successfully");

        loadEmployees();

    } catch (error) {

        console.log(error);

        alert("Failed to Delete Employee");

    }

};








    const filteredEmployees = employees.filter((employee) =>
    employee.full_name.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase())
);

    return (

        <div
    style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
        boxSizing: "border-box"
    }}
>

            <h1>Employees</h1>

            <hr />







            <div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 0"
    }}
>

    <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
        }}
    />

    <button
        onClick={() => {
            console.log("Button Clicked");
            setShowForm(true);
        }}
        style={{
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
        }}
    >
        + Add Employee
    </button>

</div>



{
    showForm && (

        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
        >

          <h2>Add Employee</h2>



          <input
            type="text"
            placeholder="Employee Code"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
            style={inputStyle}
        />

<br /><br />




<input
    type="text"
    placeholder="Full Name"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    style={inputStyle}
/>

<br /><br />

<input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={inputStyle}
/>

<br /><br />


<input
    type="text"
    placeholder="Phone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    style={inputStyle}
/>

<br /><br />

<input
    type="text"
    placeholder="Department"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
    style={inputStyle}
/>

<br /><br />

<input
    type="text"
    placeholder="Designation"
    value={designation}
    onChange={(e) => setDesignation(e.target.value)}
    style={inputStyle}
/>

<br /><br />

<input
    type="number"
    placeholder="Salary"
    value={salary}
    onChange={(e) => setSalary(e.target.value)}
    style={inputStyle}
/>

<br /><br />


<input
    type="date"
    value={joiningDate}
    onChange={(e) => setJoiningDate(e.target.value)}
    style={inputStyle}
/>

<br /><br />

<button
    onClick={handleSaveEmployee}
    style={{
        backgroundColor: "#198754",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        marginRight: "10px"
    }}
>
    Save Employee
</button>

<button
    onClick={() => setShowForm(false)}
    style={{
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer"
    }}
>
    Cancel
</button>

        </div>

    )
}



            {
                employees.length === 0 ? (

                    <h3>No Employees Found</h3>

                ) : (

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "20px",
                            background: "white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                        }}
                    >

                        <thead
                            style={{
                                backgroundColor: "#0d6efd",
                                color: "white"
                            }}
                        >

                            <tr>

                                <th style={{ padding: "15px" }}>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Actions</th>

                            </tr>

                        </thead>




                        <tbody>

{
    filteredEmployees.map((employee) => (

        <tr key={employee.id}>

            <td
                style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                }}
            >
                {employee.id}
            </td>

            <td
                style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                }}
            >
                {employee.full_name}
            </td>

            <td
                style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                }}
            >
                {employee.email}
            </td>

            <td
                style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                }}
            >
                {employee.department}
            </td>

            <td
                style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                }}
            >
                {employee.designation}
            </td>

            <td
                style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                }}
            >
                <button

                onClick={() => {

        setEditingId(employee.id);

        setEmployeeCode(employee.employee_code);

        setFullName(employee.full_name);

        setEmail(employee.email);

        setPhone(employee.phone);

        setDepartment(employee.department);

        setDesignation(employee.designation);

        setSalary(employee.salary);

        setJoiningDate(employee.joining_date);

        setShowForm(true);

    }}
                
                    style={{
                        backgroundColor: "#ffc107",
                        color: "black",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Edit
                </button>


                <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginLeft: "8px",
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
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
};

export default Employees;