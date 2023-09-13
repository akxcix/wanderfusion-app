import { authEventEmitter } from "@/auth/authEventEmitter";
import { LOCAL_STORAGE_KEYS } from "@/commons/constants";
import { renewAuth } from "@/network/passport/client";
import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await renewAuth();
        if (res.ok) {
          const token = res.ok.jwt;
          localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
          authEventEmitter.emit("authTokenUpdated", token);

          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } else {
          throw new Error(res.err);
        }
      } catch (err) {
        console.error("An unexpected error occurred:", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
