export const categoryApi = {
  getCategories: async (api) => {
    return api.get("/products/categories");
  },
  createCategory: async (api, data) => {
    return api.post("/admin/create-category", data);
  },
};
