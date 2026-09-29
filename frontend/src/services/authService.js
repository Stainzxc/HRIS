import axiosConfig from "./axiosConfig";

export const login = (credentials) => {
    return axiosConfig.post("/login", credentials);
};

export const signup = (userData) => {
    return axiosConfig.post("/signup", userData);
};

export const getCurrentUser = () => axiosConfig.get("/user");

export const logout = () => axiosConfig.post("/logout");
