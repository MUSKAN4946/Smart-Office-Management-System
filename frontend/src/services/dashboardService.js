import API from "../api/axios";

export const getDashboard = async () => {

    const token = localStorage.getItem("token");

    const response = await API.get("/dashboard/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;

};


export const getDepartmentEmployeeCount = async () => {

    const token = localStorage.getItem("token");

    const response = await API.get("/dashboard/department-count", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;

};