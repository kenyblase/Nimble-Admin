export const notificationApi = {
  fetchNotifications: async (api, page, limit) => {
    return api.get(`/admin/notifications?page=${page}&limit=${limit}`);
  }
}