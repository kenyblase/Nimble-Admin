export const chatApi = {
  fetchChats: async (api) => {
    return api.get(`/chats`);
  },
  fetchChat: async (api, id) => {
    return api.get(`/chats/${id}`);
  },
};
