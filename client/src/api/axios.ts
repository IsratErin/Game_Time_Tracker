import axios from "axios";
import { getIdToken } from "../auth/authService";

const api = axios.create({
  baseURL: "https://server-gametimetracker.vercel.app",
  withCredentials: false, // explicitly no cookies
});

// Log cookies for each request
api.interceptors.request.use(async (config) => {
  const token = await getIdToken().catch(() => null);

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Check if browser will send cookies with this request
  if (typeof document !== "undefined") {
    console.log("document.cookie:", document.cookie); // cookies for client domain
  }

  console.log("Request config.withCredentials:", config.withCredentials);

  return config;
});

// log response
api.interceptors.response.use(
  (response) => {
    console.log("Response headers:", response.headers);
    return response;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default api;
