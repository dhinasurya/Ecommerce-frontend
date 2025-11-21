import axios from "axios";
import { getAccessToken, setAccessToken, logoutUser } from "../utils/authHelpers";

// ------------------------------------
// BASE URL (move to .env later)
// ------------------------------------
const BASE_URL = "http://localhost:5000";

// Separate axios instance for refresh (NO interceptors)
const RefreshAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Main axios instance
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // sends refresh token cookie automatically
  headers: { "Content-Type": "application/json" },
});

// ------------------------------------
// REQUEST INTERCEPTOR
// ------------------------------------
API.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------------------------
// REFRESH QUEUE LOGIC
// ------------------------------------
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

// ------------------------------------
// RESPONSE INTERCEPTOR
// ------------------------------------
API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // -------- Handle 401 (Access Token expired) --------
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ---- If token refresh already in progress ----
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // ---- First request triggers refresh ----
      isRefreshing = true;

      try {
        const res = await RefreshAPI.post("/auth/refresh", {});
        const newAccessToken = res.data.access_token;

        // Save new access token
        setAccessToken(newAccessToken);

        // Unblock all queued requests
        processQueue(null, newAccessToken);

        // Retry original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);

      } catch (refreshError) {
        // Fail everything in queue
        processQueue(refreshError, null);

        logoutUser(); // Force logout
        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
