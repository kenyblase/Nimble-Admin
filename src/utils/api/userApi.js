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
//   deleteAdmin: async (api, adminId) => {
//     return api.delete(`/admin/${adminId}/delete`);
//   },
};
