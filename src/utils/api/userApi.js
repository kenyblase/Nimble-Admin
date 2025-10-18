export const userApi = {
  fetchUsers: async (api, page, limit, search, filter) => {
    return api.get(`/admin/users?page=${page}&limit=${limit}&search=${search}&filter=${filter}`);
  },
  fetchUserAnalytics: async (api) => {
    return api.get(`/admin/users/analytics`);
  },
//   editAdmin: async (api, adminId, data) => {
//     return api.put(`/admin/${adminId}/edit`, data);
//   },
//   deleteAdmin: async (api, adminId) => {
//     return api.delete(`/admin/${adminId}/delete`);
//   },
};
