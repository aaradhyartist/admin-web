import axios from "axios";

const PREFIX = import.meta.env.VITE_APP_TOKEN_PREFICS;
const ACCESS_KEY = `${PREFIX}_accessToken`;
const REFRESH_KEY = `${PREFIX}_refreshToken`;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================
   Request: attach admin token
============================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================
   Response: unwrap + handle 401
============================ */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export default api;
