export const dashboardApi = {
  getDashboardAnalytics: async (api) => {
    return api.get("/admin/analytics");
  },
  getLatestTransactions: async(api, page, limit, status, search) => {
    return api.get(`/admin/transactions?page=${page}&limit=${limit}&status=${status}&search=${search}`)
  }
};
