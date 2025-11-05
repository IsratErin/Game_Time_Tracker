import axios from "axios";

const api = axios.create({
  baseURL: `https://server-gametimetracker.vercel.app/`,
  withCredentials: false,
});

export default api;
