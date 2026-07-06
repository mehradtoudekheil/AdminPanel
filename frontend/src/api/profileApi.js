import api from "./axiosApi";

export const profileApi = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/profile");
    return response.data;
  },

  // Update profile
  updateProfile: async (formData) => {
    const response = await api.put("/profile", formData);
    return response.data;
  },

  // Change password
  changePassword: async (passwords) => {
    const response = await api.put("/profile/password", passwords);
    return response.data;
  },
};