import axiosConfig from "./axiosConfig";

export const getLeaveRequests = (filters = {}, page = 1) =>
    axiosConfig.get("/leave-requests", {
        params: { ...filters, page, per_page: 10 },
    });
export const createLeaveRequest = (request) =>
    axiosConfig.post("/leave-requests", request);
export const updateLeaveRequest = (id, request) =>
    axiosConfig.put(`/leave-requests/${id}`, request);
