
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onMenuClick = () => {} }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button
                    className="menu-button"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                >
                    ☰
                </button>

                <h2 className="navbar-title">
                    🏢 Smart Office Management System
                </h2>
            </div>

            <button
                onClick={handleLogout}
                className="logout-button"
            >
                Logout
            </button>
        </header>
    );
}

export default Navbar;
