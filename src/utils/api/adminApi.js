export const adminApi = {
  fetchAllAdmins: async (api, page, limit, search) => {
    return api.get(`/admin/get-admins?page=${page}&limit=${limit}&search=${search}`);
  },
  editAdmin: async (api, adminId, data) => {
    return api.put(`/admin/${adminId}/edit`, data);
  },
  deleteAdmin: async (api, adminId, password) => {
    return api.delete(`/admin//${adminId}/delete`, password);
  },
};
