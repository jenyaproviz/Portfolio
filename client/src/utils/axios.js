import axios from "axios";
import { apiBaseUrl } from "./api";

const instance = axios.create({
  baseURL: apiBaseUrl,
  validateStatus: () => true,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
