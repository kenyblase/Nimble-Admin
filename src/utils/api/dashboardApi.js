export const dashboardApi = {
  getDashboardAnalytics: async (api) => {
    return api.get("/admin/get-analytics");
  },
  getLatestTransactions: async(api, page, limit) => {
    return api.get(`/admin/get-transactions?page=${page}&limit=${limit}`)
  }
};
