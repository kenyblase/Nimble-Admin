export const settingsApi = {
  uploadAvatar: async (api, data) => {
    return api.post("/settings/admin-avatar-upload", data);
  },
};
