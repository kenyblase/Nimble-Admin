export const orderApi = {
  fetchOrders: async (api, page, limit, search, filter) => {
    return api.get(`/admin/orders?page=${page}&limit=${limit}&search=${search}&filter=${filter}`);
  },
   fetchOrder: async (api, id) => {
    return api.get(`/admin/orders/${id}`);
  },
  fetchOrderAnalytics: async (api) => {
    return api.get(`/admin/orders/analytics`);
  },
  editUser: async (api, userId, data) => {
    return api.put(`/admin/users/${userId}/edit`, data);
  },
  toggleUserStatus: async (api, id, status) =>{
    return api.put(`admin/users/${id}/status`, { status })
  },
  fetchUserListings: async (api, id, page, limit, status) => {
    return api.get(`/admin/listings/products/user/${id}?page=${page}&limit=${limit}&status=${status}`);
  },
};
