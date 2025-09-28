export const adminApi = {
  fetchAllAdmins: async (api, page, limit) => {
    return api.get(`/admin/get-all-admins?page=${page}&limit=${limit}`);
  },
  editAdminPermissions: async (api, adminId, data) => {
    return api.post(`/admin/edit-admin-permissions/${adminId}`, data);
  },
  deleteAdmin: async (api, adminId, password) => {
    return api.post(`/admin/delete-admin/${adminId}`, password);
  },
};
