export const payoutApi = {
  fetchPayouts: async (api, page, limit, search, filter) => {
    return api.get(`/admin/payouts?page=${page}&limit=${limit}&search=${search}&filter=${filter}`);
  },
   fetchPayout: async (api, id) => {
    return api.get(`/admin/payouts/${id}`);
  },
  fetchPayoutAnalytics: async (api) => {
    return api.get(`/admin/payouts/analytics`);
  },
  createPayout: async (api, data) => {
    return api.post(`/admin/payouts/create`, data);
  },
  togglePayoutStatus: async (api, id, status) =>{
    return api.put(`admin/payouts/${id}/status`, { status })
  },
  approvePayout: async (api, id) =>{
    return api.put(`admin/payouts/accept/${id}`)
  },
  rejectPayout: async (api, id) =>{
    return api.put(`admin/payouts/reject/${id}`)
  },
};
