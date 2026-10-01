import axiosConfig from "./axiosConfig";

export const getTasks = (filters = {}, page = 1) =>
    axiosConfig.get("/tasks", { params: { ...filters, page, per_page: 100 } });
