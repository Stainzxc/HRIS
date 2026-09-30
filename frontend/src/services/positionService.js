import axiosConfig from "./axiosConfig";

export const getPositions = (filters = {}, page = 1) =>
    axiosConfig.get("/positions", { params: { ...filters, page, per_page: 10 } });
export const createPosition = (data) => axiosConfig.post("/positions", data);
export const updatePosition = (id, data) => axiosConfig.put(`/positions/${id}`, data);
export const deletePosition = (id) => axiosConfig.delete(`/positions/${id}`);
