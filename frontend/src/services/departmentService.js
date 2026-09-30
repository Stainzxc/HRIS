import axiosConfig from "./axiosConfig";

export const getDepartments = (page = 1, perPage = 10) =>
    axiosConfig.get("/departments", { params: { page, per_page: perPage } });

export const getAllDepartments = async () => {
    const departments = [];
    let page = 1;
    let lastPage = 1;

    do {
        const { data } = await getDepartments(page);
        departments.push(...(data.data ?? data));
        lastPage = data.meta?.last_page ?? 1;
        page += 1;
    } while (page <= lastPage);

    return departments;
};
export const createDepartment = (data) => axiosConfig.post("/departments", data);
export const updateDepartment = (id, data) => axiosConfig.put(`/departments/${id}`, data);
export const deleteDepartment = (id) => axiosConfig.delete(`/departments/${id}`);
