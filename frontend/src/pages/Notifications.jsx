import { useEffect, useState } from "react";
import API from "../api/axios";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await API.get("/leaves/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const leaves = response.data;

            const generatedNotifications = leaves.map((leave) => ({
                id: leave.id,
                message:
                    leave.status === "Pending"
                        ? `Leave request is pending for Employee ID ${leave.employee_id}.`
                        : `Leave request for Employee ID ${leave.employee_id} has been ${leave.status.toLowerCase()}.`,
                status: leave.status,
                date: leave.start_date,
            }));

            setNotifications(generatedNotifications);
        } catch (error) {
            console.error(error);
            alert("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                <h2>Loading Notifications...</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
                padding: "40px",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#1f2937",
                        marginBottom: "10px",
                    }}
                >
                    Notifications
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#6b7280",
                        marginBottom: "35px",
                    }}
                >
                    Recent updates from your office management system
                </p>

                {notifications.length === 0 ? (
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            padding: "35px",
                            borderRadius: "14px",
                            textAlign: "center",
                            border: "1px solid #e5e7eb",
                        }}
                    >
                        <h3>No notifications</h3>
                        <p style={{ color: "#6b7280" }}>
                            There are currently no leave-related notifications.
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gap: "15px",
                        }}
                    >
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                style={{
                                    backgroundColor: "#ffffff",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    border: "1px solid #e5e7eb",
                                    boxShadow:
                                        "0 4px 12px rgba(0,0,0,0.05)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "15px",
                                    }}
                                >
                                    <div>
                                        <h3
                                            style={{
                                                margin: "0 0 8px",
                                                color: "#1f2937",
                                            }}
                                        >
                                            🔔 Notification
                                        </h3>

                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#4b5563",
                                            }}
                                        >
                                            {notification.message}
                                        </p>

                                        <small
                                            style={{
                                                display: "block",
                                                marginTop: "8px",
                                                color: "#9ca3af",
                                            }}
                                        >
                                            Leave date: {notification.date}
                                        </small>
                                    </div>

                                    <span
                                        style={{
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            backgroundColor:
                                                notification.status ===
                                                "Pending"
                                                    ? "#fff7ed"
                                                    : notification.status ===
                                                      "Approved"
                                                    ? "#ecfdf5"
                                                    : "#fef2f2",
                                            color:
                                                notification.status ===
                                                "Pending"
                                                    ? "#c2410c"
                                                    : notification.status ===
                                                      "Approved"
                                                    ? "#047857"
                                                    : "#b91c1c",
                                            fontWeight: "600",
                                            fontSize: "13px",
                                        }}
                                    >
                                        {notification.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notifications;