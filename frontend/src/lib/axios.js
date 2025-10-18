import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_KEY;
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
