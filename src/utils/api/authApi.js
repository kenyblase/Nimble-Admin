export const authApi = {
  checkAdminEmail: async (api, data) => {
    return api.post("/auth/admin-email-check", data);
  },
  setNewPassword: async (api, data) => {
    return api.post("/auth/admin-set-password", data);
  },
  login: async (api, data) => {
    return api.post("/admin/login", data);
  },
  register: async (api, data) => {
    return api.post("/auth/admin-signup", data);
  },
};
