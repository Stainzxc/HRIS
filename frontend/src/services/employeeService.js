import axiosConfig from "./axiosConfig";

export const getEmployees = (filters = {}) => {
    return axiosConfig.get("/employees", { params: filters });
}

export const createEmployee = (employee) => {
    return axiosConfig.post("/employees", employee);
};

export const getEmployeePositions = () => {
    return axiosConfig.get("/positions");
};
