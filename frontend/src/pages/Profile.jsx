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
        return <p style={{ padding: "20px" }}>Loading profile...</p>;
    }

    if (!profile) {
        return <p style={{ padding: "20px" }}>Profile not found.</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>My Profile</h1>

            <div
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    maxWidth: "500px",
                }}
            >
                <p>
                    <strong>ID:</strong> {profile.id}
                </p>

                <p>
                    <strong>Full Name:</strong> {profile.full_name}
                </p>

                <p>
                    <strong>Email:</strong> {profile.email}
                </p>

                <p>
                    <strong>Role:</strong> {profile.role}
                </p>
            </div>
        </div>
    );
}

export default Profile;