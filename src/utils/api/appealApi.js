export const appealApi = {
  getAppeals: async(api, page, type, limit, search, status) => {
    return api.get(`/admin/appeals?type=${type}&page=${page}&limit=${limit}&status=${status}&search=${search}`)
  },
  getAppeal: async (api, id) => {
    return api.get(`/admin/appeals/${id}`);
  },
  toggleAppealStatus: async (api, id, status) =>{
    return api.put(`admin/appeals/${id}/status`, { status })
  },
};
