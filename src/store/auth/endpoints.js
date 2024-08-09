import axiosInstance from "../../lib/AxiosInstance";


export const loginRequest = (payload) => axiosInstance.post("/v1/auth/login", payload);