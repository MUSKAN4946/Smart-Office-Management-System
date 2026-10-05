import API from "../api/axios";

export const getUsers = async () => {
    const response = await API.get("/users/");
    return response.data;
};

export const getUserById = async (userId) => {
    const response = await API.get(`/users/${userId}`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await API.post("/users/", userData);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await API.put(
        `/users/${userId}`,
        userData
    );
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await API.delete(
        `/users/${userId}`
    );
    return response.data;
};