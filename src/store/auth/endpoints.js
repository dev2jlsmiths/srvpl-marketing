import axiosInstance from '../../lib/axiosInstance'

export const loginRequest = (payload) => axiosInstance.post("login", payload);