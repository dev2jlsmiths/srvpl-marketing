// src/axiosInterceptor.js

import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.baseURL = apiUrl;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
