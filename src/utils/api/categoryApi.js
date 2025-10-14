export const categoryApi = {
  getAllCategories: async (api) => {
    return api.get("/admin/categories");
  },
  getCategory: async (api, id) => {
    return api.get(`/admin/categories/${id}`);
  },
  toggleCategoryActiveStatus: async (api, id) => {
    return api.put(`/admin/categories/${id}/toggle`);
  },
  getCategoriesWithProductCount: async (api, page = 1, limit = 10, search) => {
    return api.get(`/admin/categories-count?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
  },
  createCategory: async (api, data) => {
    return api.post("/admin/create-category", data);
  },
  getTotalCommission: async (api, filter) => {
    return api.get(`/admin/commissions/total?filter=${filter}`);
  },
  getCategoryCommission: async (api, categoryId, filter) => {
    return api.get(`admin/commissions/category?categoryId=${categoryId}&filter=${filter}`);
  },
};
