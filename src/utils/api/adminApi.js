export const adminApi = {
  fetchAllAdmins: async (api, page, limit, search) => {
    return api.get(`/admin/admins?page=${page}&limit=${limit}&search=${search}`);
  },
  addAdmin: async (api, data) => {
    return api.post(`/admin/create`, data);
  },
  editAdmin: async (api, adminId, data) => {
    return api.put(`/admin/${adminId}/edit`, data);
  },
  deleteAdmin: async (api, adminId) => {
    return api.delete(`/admin/${adminId}/delete`);
  },
};
