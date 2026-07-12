import api from "./axiosApi";

export const usersApi = {
  getUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },
};