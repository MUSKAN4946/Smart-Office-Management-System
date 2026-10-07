import { useEffect, useState } from "react";
import {
    getAllPayrolls,
    getMyPayroll,
    addPayroll
} from "../services/payrollService";

function PayrollManagement() {
    const [payrolls, setPayrolls] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(true);

    const [employeeId, setEmployeeId] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [hra, setHra] = useState("");
    const [bonus, setBonus] = useState("");
    const [deductions, setDeductions] = useState("");

    const [showForm, setShowForm] = useState(false);

const fetchPayrolls = async () => {
    try {
        const data =
            user?.role === "Admin"
                ? await getAllPayrolls()
                : await getMyPayroll();

        setPayrolls(data);
    } catch (error) {
        console.error(error);
        alert("Failed to fetch payroll records");
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const handleSubmitPayroll = async (e) => {
        e.preventDefault();

        if (!employeeId) {
            alert("Please enter employee ID.");
            return;
        }

        if (!basicSalary) {
            alert("Please enter basic salary.");
            return;
        }

        if (Number(basicSalary) < 0) {
            alert("Basic salary cannot be negative.");
            return;
        }

        if (Number(hra) < 0 || Number(bonus) < 0 || Number(deductions) < 0) {
            alert("HRA, bonus and deductions cannot be negative.");
            return;
        }

        try {
           await addPayroll({
            employee_id: Number(employeeId),
            basic_salary: Number(basicSalary),
            hra: Number(hra || 0),
            bonus: Number(bonus || 0),
            deductions: Number(deductions || 0),
        });

            alert("Payroll added successfully!");

            setEmployeeId("");
            setBasicSalary("");
            setHra("");
            setBonus("");
            setDeductions("");

            setShowForm(false);
            fetchPayrolls();
        } catch (error) {
            console.error(error);
            alert("Failed to add payroll");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Payroll Management</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                style={{
                    padding: "10px 16px",
                    marginBottom: "20px",
                    cursor: "pointer",
                }}
            >
                {showForm ? "Close Form" : "Add Payroll"}
            </button>

            {showForm && (
                <form
                    onSubmit={handleSubmitPayroll}
                    style={{
                        display: "grid",
                        gap: "10px",
                        maxWidth: "400px",
                        marginBottom: "30px",
                    }}
                >
                    <input
                        type="number"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Basic Salary"
                        value={basicSalary}
                        onChange={(e) => setBasicSalary(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="HRA"
                        value={hra}
                        onChange={(e) => setHra(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Bonus"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Deductions"
                        value={deductions}
                        onChange={(e) => setDeductions(e.target.value)}
                    />

                    <button type="submit">
                        Add Payroll
                    </button>
                </form>
            )}

            <h2>Payroll Records</h2>

            {loading ? (
                <p>Loading payroll records...</p>
            ) : payrolls.length === 0 ? (
                <p>No payroll records found.</p>
            ) : (
                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        borderCollapse: "collapse",
                        width: "100%",
                    }}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee ID</th>
                            <th>Basic Salary</th>
                            <th>HRA</th>
                            <th>Bonus</th>
                            <th>Deductions</th>
                            <th>Net Salary</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payrolls.map((payroll) => (
                            <tr key={payroll.id}>
                                <td>{payroll.id}</td>
                                <td>{payroll.employee_id}</td>
                                <td>₹{payroll.basic_salary}</td>
                                <td>₹{payroll.hra}</td>
                                <td>₹{payroll.bonus}</td>
                                <td>₹{payroll.deductions}</td>
                                <td>₹{payroll.net_salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PayrollManagement;