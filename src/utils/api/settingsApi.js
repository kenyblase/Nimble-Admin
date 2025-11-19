export const settingsApi = {
  getSettingByKey: async (api, key) => {
    return api.get(`/admin/settings/${key}`);
  },
  updateSettingByKey: async (api, key, value) => {
    return api.put(`/admin/settings/${key}`, { value });
  },
};
