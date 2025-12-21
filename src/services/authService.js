import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add token from cookie to Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(
    `${import.meta.env.VITE_APP_TOKEN_PREFICS}_accessToken`
  );
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const fetchUserProfile = async () => {
  const res = await api.get("/user/me");
  return res.data;
};
