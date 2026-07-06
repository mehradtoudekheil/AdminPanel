// src/utils/storage.js

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const storage = {
  // Access Token
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),

  setAccessToken: (token) =>
    localStorage.setItem(ACCESS_TOKEN, token),

  removeAccessToken: () =>
    localStorage.removeItem(ACCESS_TOKEN),

  // Refresh Token
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN),

  setRefreshToken: (token) =>
    localStorage.setItem(REFRESH_TOKEN, token),

  removeRefreshToken: () =>
    localStorage.removeItem(REFRESH_TOKEN),

  // Remove All
  clearAuth: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  },
};


// استفاده کردن 

// import { storage } from "../utils/storage";

// storage.getAccessToken();
// storage.setAccessToken(token);
// storage.clearAuth();