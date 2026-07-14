import api from "./axiosApi";

export const productsApi = {
  createProduct: async (formData) => {
    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};