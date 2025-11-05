export const chatApi = {
  fetchChats: async (api) => {
    return api.get(`/chats`);
  },
  fetchChat: async (api, id) => {
    return api.get(`/chats/${id}`);
  },
  sendMessage: async (api, id, text) => {
    return api.post(`chats/admin/${id}/message`, { text });
  },
};
