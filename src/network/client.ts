import { HOSTS, LOCAL_STORAGE_KEYS } from "@/commons/constants";
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
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN
        );
        const res = await axios.post(HOSTS.PASSPORT + "/users/token/refresh", {
          jwt: refreshToken,
        });
        const token = res.data.data;

        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (err) {
        console.error("An unexpected error occurred:", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
