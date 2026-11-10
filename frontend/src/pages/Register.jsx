import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await registerUser({
                full_name: fullName,
                email,
                password
            });

            alert("Registration Successful! Please Login.");
            navigate("/login");

        } catch (error) {
            console.error("Registration Error:", error.response?.data || error);
            alert(
                error.response?.data?.detail ||
                "Registration failed. Please try again."
            );
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        marginBottom: "18px"
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "60px"
            }}
        >
            <h1 style={{ fontSize: "36px", textAlign: "center" }}>
                Smart Office Management System
            </h1>

            <div
                style={{
                    background: "white",
                    width: "380px",
                    maxWidth: "90%",
                    padding: "35px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
                    Create Account
                </h2>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "#0d6efd",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold"
                        }}
                    >
                        Register
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "22px" }}>
                    Already have an account?{" "}
                    <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;