import axiosConfig from "./axiosConfig";

export const getLeaveBalances = (filters = {}) =>
    axiosConfig.get("/leave-balances", { params: filters });
export const createLeaveBalance = (balance) =>
    axiosConfig.post("/leave-balances", balance);
export const updateLeaveBalance = (id, balance) =>
    axiosConfig.put(`/leave-balances/${id}`, balance);
