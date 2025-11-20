import axios from "axios";
import { getIdToken } from "../auth/authService";

const api = axios.create({
  baseURL:
    "https://game-time-trackerserver-git-auth-israt-jahan-erins-projects.vercel.app",
  withCredentials: false,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getIdToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error("Token fetch failed:", e);
  }
  return config;
});

export default api;
