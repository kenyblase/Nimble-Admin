export const categoryApi = {
  getAllCategories: async (api) => {
    return api.get("/admin/categories");
  },
  getCategoriesWithProductCount: async (api, page = 1, limit = 10, search) => {
    return api.get(`/admin/categories-count?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
  },
  createCategory: async (api, data) => {
    return api.post("/admin/create-category", data);
  },
};
