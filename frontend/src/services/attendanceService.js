import API from "../api/axios";


// ===============================
// GET ALL ATTENDANCE
// ===============================

export const getAttendance = async () => {

    const token = localStorage.getItem("token");

    const response = await API.get(
        "/attendance/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ===============================
// ADD ATTENDANCE
// ===============================

export const addAttendance = async (attendance) => {

    const token = localStorage.getItem("token");

    const response = await API.post(
        "/attendance/",
        attendance,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ===============================
// UPDATE ATTENDANCE
// ===============================

export const updateAttendance = async (
    attendanceId,
    attendance
) => {

    const token = localStorage.getItem("token");

    const response = await API.put(
        `/attendance/${attendanceId}`,
        attendance,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ===============================
// DELETE ATTENDANCE
// ===============================

export const deleteAttendance = async (attendanceId) => {

    const token = localStorage.getItem("token");

    const response = await API.delete(
        `/attendance/${attendanceId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ===============================
// FILTER ATTENDANCE
// ===============================

export const filterAttendance = async (
    employeeId = null,
    status = null
) => {

    const token = localStorage.getItem("token");

    const params = {};

    if (employeeId) {
        params.employee_id = employeeId;
    }

    if (status) {
        params.status = status;
    }

    const response = await API.get(
        "/attendance/filter",
        {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ===============================
// GET MY ATTENDANCE
// ===============================

export const getMyAttendance = async () => {

    const token = localStorage.getItem("token");

    const response = await API.get(
        "/attendance/my",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};