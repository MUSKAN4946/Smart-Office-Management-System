import API from "../api/axios";

export const getMyProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await API.get(
        "/profile/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};