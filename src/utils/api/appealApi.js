export const appealApi = {
  getAppeals: async(api, page, type, limit, search, status) => {
    return api.get(`/admin/appeals?type=${type}&page=${page}&limit=${limit}&status=${status}&search=${search}`)
  }
};
