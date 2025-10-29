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
    return api.post("/admin/categories/create", data);
  },
  updateCategory: async (api, id, data) => {
    return api.put(`/admin/categories/${id}/update`, data);
  },
  deleteCategory: async (api, id) => {
    return api.delete(`/admin/categories/${id}/delete`);
  },
  getTotalCommission: async (api, filter) => {
    return api.get(`/admin/commissions/total?filter=${filter}`);
  },
  getCategoryCommission: async (api, categoryId, filter) => {
    return api.get(`admin/commissions/category?categoryId=${categoryId}&filter=${filter}`);
  },
  fetchCategoryListings: async (api, id, page, limit, status) => {
    return api.get(`/admin/listings/products/category/${id}?page=${page}&limit=${limit}&status=${status}`);
  },
};
