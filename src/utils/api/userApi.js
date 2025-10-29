export const userApi = {
  fetchUsers: async (api, page, limit, search, filter) => {
    return api.get(`/admin/users?page=${page}&limit=${limit}&search=${search}&filter=${filter}`);
  },
   fetchUser: async (api, id) => {
    return api.get(`/admin/users/${id}`);
  },
  fetchUserAnalytics: async (api) => {
    return api.get(`/admin/users/analytics`);
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
