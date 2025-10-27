export const listingApi = {
  fetchListings: async (api, page, limit, type, status) => {
    return api.get(`/admin/listings/products?page=${page}&limit=${limit}&status=${status}&type=${type}`);
  },
   fetchListing: async (api, id) => {
    return api.get(`/admin/listings/products/${id}`);
  },
  fetchListingAnalytics: async (api, type) => {
    return api.get(`/admin/listings/analytics?type=${type}`);
  },
  // editUser: async (api, userId, data) => {
  //   return api.put(`/admin/users/${userId}/edit`, data);
  // },
  toggleProductStatus: async (api, id, status) =>{
    return api.put(`admin/listings/products/${id}/status`, { status })
  }
};
