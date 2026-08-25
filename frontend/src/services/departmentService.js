import API from "../api/axios";

export const getDepartments = async () => {

    const token = localStorage.getItem("token");

    const response = await API.get(
        "/departments/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const addDepartment = async (department) => {

    const token = localStorage.getItem("token");

    const response = await API.post(
        "/departments/",
        department,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateDepartment = async (id, department) => {

    const token = localStorage.getItem("token");

    const response = await API.put(
        `/departments/${id}`,
        department,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteDepartment = async (id) => {

    const token = localStorage.getItem("token");

    const response = await API.delete(
        `/departments/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};