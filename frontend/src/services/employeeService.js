import axiosConfig from "./axiosConfig";

export const getEmployees = (filters = {}, page = 1) => {
    return axiosConfig.get("/employees", { params: { ...filters, page, per_page: 10 } });
}

export const createEmployee = (employee) => {
    return axiosConfig.post("/employees", employee);
};

export const getEmployeePositions = () => {
    return axiosConfig.get("/positions");
};
