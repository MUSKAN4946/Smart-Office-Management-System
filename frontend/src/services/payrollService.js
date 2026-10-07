import API from "../api/axios";

export const getAllPayrolls = async () => {
    const token = localStorage.getItem("token");

    const response = await API.get(
        "/payroll/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const getMyPayroll = async () => {
    const token = localStorage.getItem("token");

    const response = await API.get(
        "/payroll/my",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addPayroll = async (payroll) => {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "/payroll/",
        payroll,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};