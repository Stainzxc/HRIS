import axiosConfig from "./axiosConfig";

export const getEmployees = () => {
    return axiosConfig.get("/employees");
}