import axios from "axios";

const api = axios.create({
  baseURL: `https://game-time-trackerserver.vercel.app/`,
  //baseURL: `http://localhost:3000/`,
  withCredentials: false,
});

export default api;
