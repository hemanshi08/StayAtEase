// src/api/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers:{
    
  }
  // point to your backend
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(`${instance.defaults.baseURL}/auth/refresh-token`, {
            refreshToken,
          });

          const { token, refreshToken: newRefreshToken } = response.data;
          
          // Update tokens in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, clear tokens and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
