import axiosConfig from "./axiosConfig";

export const getEmployees = (filters = {}, page = 1) => {
    return axiosConfig.get("/employees", {
        params: { ...filters, page, per_page: 10 },
    });
};

export const exportEmployees = (filters = {}) => {
    return axiosConfig.get("/employees/export", {
        params: filters,
        responseType: "blob",
    });
};

export const createEmployee = (employee) => {
    return axiosConfig.post("/employees", employee);
};

export const updateEmployee = (id, employee) => {
    return axiosConfig.put(`/employees/${id}`, employee);
};

export const deleteEmployee = (id) => axiosConfig.delete(`/employees/${id}`);

export const getEmployeePositions = () => {
    return axiosConfig.get("/positions");
};

export const getDepartments = () => axiosConfig.get("/departments");
export const createDepartment = (data) =>
    axiosConfig.post("/departments", data);
export const updateDepartment = (id, data) =>
    axiosConfig.put(`/departments/${id}`, data);
export const deleteDepartment = (id) =>
    axiosConfig.delete(`/departments/${id}`);
