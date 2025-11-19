import axios from "axios";
import { getIdToken } from "../auth/authService";

const api = axios.create({
  baseURL: `https://server-gametimetracker.vercel.app/`,
  //baseURL: `http://localhost:3000/`,
  withCredentials: false,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getIdToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      localStorage.setItem("authToken", token || "");
    } catch (error) {
      console.error("Error retrieving ID token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
