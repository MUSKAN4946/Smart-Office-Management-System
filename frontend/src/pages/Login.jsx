import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser({
                email,
                password
            });

            alert("Login Successful!");

            localStorage.setItem(
                "token",
                response.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            navigate("/dashboard");

            console.log(response);

        } catch (error) {

            console.log("FULL ERROR:", error);
            console.log("Response:", error.response);
            console.log("Data:", error.response?.data);

            alert(JSON.stringify(error.response?.data));

        }

    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "80px"
            }}
        >

            <h1
                style={{
                    margin: "0 0 45px 0",
                    fontSize: "42px",
                    textAlign: "center"
                }}
            >
                Smart Office Management System
            </h1>


            <div
                style={{
                    background: "white",
                    width: "380px",
                    padding: "35px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
                }}
            >

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    Login
                </h2>


                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box",
                            marginBottom: "20px"
                        }}
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box",
                            marginBottom: "25px"
                        }}
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
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;