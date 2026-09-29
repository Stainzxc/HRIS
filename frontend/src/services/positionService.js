import axiosConfig from "./axiosConfig";

export const getPositions = () => axiosConfig.get("/positions");
export const createPosition = (data) => axiosConfig.post("/positions", data);
export const updatePosition = (id, data) => axiosConfig.put(`/positions/${id}`, data);
export const deletePosition = (id) => axiosConfig.delete(`/positions/${id}`);
