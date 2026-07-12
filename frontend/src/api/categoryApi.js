import api from "./axiosApi";

export const categoryApi = {
  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
};