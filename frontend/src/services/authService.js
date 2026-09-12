import axiosConfig from "./axiosConfig";

export const login = (credentials) => {
    return axiosConfig.post("/login", credentials);
};

export const signup = (userData) => {
    return axiosConfig.post("/signup", userData);
}
