import axiosConfig from "./axiosConfig";

export const getEmployees = () => {
    return axiosConfig.get("/employees");
}

export const createEmployee = (employee) => {
    return axiosConfig.post("/employees", employee);
};

export const getEmployeePositions = () => {
    return axiosConfig.get("/positions");
};
