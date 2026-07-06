import api from "./axiosApi";
import { storage } from "../utils/storage";
export const authApi = {
  // Register
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // Refresh Access Token
  refresh: async () => {
  const response = await api.post("/auth/refresh", {
    refreshToken: storage.getRefreshToken(),
  });

  return response.data;
},

  // Logout
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};