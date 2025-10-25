export const listingApi = {
  fetchListings: async (api, page, limit, status) => {
    return api.get(`/admin/listings/products?page=${page}&limit=${limit}&status=${status}`);
  },
   fetchUser: async (api, id) => {
    return api.get(`/admin/users/${id}`);
  },
  fetchListingAnalytics: async (api) => {
    return api.get(`/admin/listings/analytics`);
  },
  editUser: async (api, userId, data) => {
    return api.put(`/admin/users/${userId}/edit`, data);
  },
  toggleUserStatus: async (api, id, status) =>{
    return api.put(`admin/users/${id}/status`, { status })
  }
};
