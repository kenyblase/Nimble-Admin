export const dashboardApi = {
  getDashboardAnalytics: async (api) => {
    return api.get("/admin/get-analytics");
  },
};
