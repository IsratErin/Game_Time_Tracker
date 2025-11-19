import axios from "axios";

const api = axios.create({
  baseURL: `https://server-gametimetracker.vercel.app/`,
  //baseURL: `http://localhost:3000/`,
  withCredentials: false,
});

export default api;
