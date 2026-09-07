import axiosConfig from "./axiosConfig";

export const login = (credentials) => {
    return axiosConfig.post("/login", credentials);
};
