export const reportApi = {
  getReports: async(api, page, type, limit, search, status) => {
    return api.get(`/admin/reports?type=${type}&page=${page}&limit=${limit}&status=${status}&search=${search}`)
  },
  getReport: async (api, id) => {
    return api.get(`/admin/reports/${id}`);
  },
  toggleReportStatus: async (api, id, status) =>{
    return api.put(`admin/reports/${id}/status`, { status })
  },
};
