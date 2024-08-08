import axios from "axios";

const url = import.meta.env.VITE_END_POINT_API;
console.log(url);

const axiosInstance = axios.create({
    baseURL: url,
});

axiosInstance.interceptors.request.use(
    (req) => {
        if (localStorage.getItem("token")) {
            req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        }
        return req;
    },
    (err) => Promise.reject(err)
);

export default axiosInstance;