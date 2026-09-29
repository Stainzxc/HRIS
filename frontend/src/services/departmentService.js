import axiosConfig from "./axiosConfig";

export const getDepartments = () => axiosConfig.get("/departments");
export const createDepartment = (data) => axiosConfig.post("/departments", data);
export const updateDepartment = (id, data) => axiosConfig.put(`/departments/${id}`, data);
export const deleteDepartment = (id) => axiosConfig.delete(`/departments/${id}`);
