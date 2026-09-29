import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosConfig.interceptors.request.use((config) => {
    const token = localStorage.getItem("hris-access-token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosConfig;
