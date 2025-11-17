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
  fetchUserListings: async (api, id, page, limit, status) => {
    return api.get(`/admin/listings/products/user/${id}?page=${page}&limit=${limit}&status=${status}`);
  },
};
