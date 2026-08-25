import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

};

    return (

       <div
style={{
    backgroundColor: "#0d6efd",
    color: "white",
    padding:"20px 35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box"
}}
>

<h2
style={{
    margin:0,
    fontSize:"clamp(18px,2vw,32px)",
    whiteSpace:"normal"
}}
>
🏢 Smart Office Management System
</h2>

            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: "white",
                    color: "#0d6efd",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Logout
            </button>

        </div>

    );

}

export default Navbar;