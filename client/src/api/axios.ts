import axios from "axios";
import { getIdToken } from "../auth/authService";

const api = axios.create({
  baseURL: "https://server-gametimetracker.vercel.app",
  withCredentials: false, // changed
});

api.interceptors.request.use(
  async (config) => {
    const token = await getIdToken().catch(() => null);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
