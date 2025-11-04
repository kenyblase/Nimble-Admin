export const chatApi = {
   fetchChats: async (api) => {
    return api.get(`/chats`);
  },

};
