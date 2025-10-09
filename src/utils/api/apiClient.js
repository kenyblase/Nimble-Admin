import axios from "axios";
import { useAuthStore } from "../api/store/useAuthStore";

export const useApiClient = (contentType) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": contentType ? contentType : "application/json",
    },
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const {logout} = useAuthStore.getState()
        logout()
      }
      return Promise.reject(error);
    }
  );

  return api;
}
