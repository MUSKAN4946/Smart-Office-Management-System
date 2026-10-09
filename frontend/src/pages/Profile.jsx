import { useEffect, useState } from "react";
import { getMyProfile } from "../services/profileService";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const data = await getMyProfile();
            setProfile(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f7fb",
                    fontSize: "18px",
                    color: "#555",
                }}
            >
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f7fb",
                    fontSize: "18px",
                    color: "#555",
                }}
            >
                Profile not found.
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
                padding: "50px 20px",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "10px",
                        fontSize: "36px",
                        color: "#1f2937",
                    }}
                >
                    My Profile
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        marginBottom: "35px",
                        color: "#6b7280",
                        fontSize: "16px",
                    }}
                >
                    View your account information
                </p>

                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        padding: "35px",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                        border: "1px solid #e5e7eb",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "30px",
                        }}
                    >
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                margin: "0 auto 15px",
                                borderRadius: "50%",
                                backgroundColor: "#e8f0fe",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "38px",
                            }}
                        >
                            👤
                        </div>

                        <h2
                            style={{
                                margin: "0 0 6px",
                                color: "#111827",
                                fontSize: "24px",
                            }}
                        >
                            {profile.full_name}
                        </h2>

                        <span
                            style={{
                                display: "inline-block",
                                padding: "6px 16px",
                                borderRadius: "20px",
                                backgroundColor: "#e8f0fe",
                                color: "#2563eb",
                                fontWeight: "600",
                                fontSize: "14px",
                            }}
                        >
                            {profile.role}
                        </span>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gap: "15px",
                        }}
                    >
                        <div
                            style={{
                                padding: "18px 20px",
                                borderRadius: "10px",
                                backgroundColor: "#f9fafb",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "#6b7280",
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                }}
                            >
                                USER ID
                            </div>

                            <div
                                style={{
                                    fontSize: "17px",
                                    color: "#111827",
                                    fontWeight: "500",
                                }}
                            >
                                {profile.id}
                            </div>
                        </div>

                        <div
                            style={{
                                padding: "18px 20px",
                                borderRadius: "10px",
                                backgroundColor: "#f9fafb",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "#6b7280",
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                }}
                            >
                                FULL NAME
                            </div>

                            <div
                                style={{
                                    fontSize: "17px",
                                    color: "#111827",
                                    fontWeight: "500",
                                }}
                            >
                                {profile.full_name}
                            </div>
                        </div>

                        <div
                            style={{
                                padding: "18px 20px",
                                borderRadius: "10px",
                                backgroundColor: "#f9fafb",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "#6b7280",
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                }}
                            >
                                EMAIL
                            </div>

                            <div
                                style={{
                                    fontSize: "17px",
                                    color: "#111827",
                                    fontWeight: "500",
                                }}
                            >
                                {profile.email}
                            </div>
                        </div>

                        <div
                            style={{
                                padding: "18px 20px",
                                borderRadius: "10px",
                                backgroundColor: "#f9fafb",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "#6b7280",
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                }}
                            >
                                ROLE
                            </div>

                            <div
                                style={{
                                    fontSize: "17px",
                                    color: "#111827",
                                    fontWeight: "500",
                                }}
                            >
                                {profile.role}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;