import axiosConfig from "./axiosConfig";

export const getTasks = (filters = {}, page = 1) =>
    axiosConfig.get("/tasks", { params: { ...filters, page, per_page: 10 } });

export const createTask = (task) => axiosConfig.post("/tasks", task);
