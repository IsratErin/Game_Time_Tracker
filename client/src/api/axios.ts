import axios from "axios";
import { getIdToken } from "../auth/authService";

const api = axios.create({
  baseURL: "https://server-gametimetracker.vercel.app",
  withCredentials: false, // explicitly no cookies
});

// Request interceptor to include the ID token in the Authorization header
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getIdToken().catch(() => null);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving ID token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
