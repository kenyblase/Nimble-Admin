import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { chatApi } from "../../api/chatApi";
import toast from "react-hot-toast";

export const useSendMessage = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, text }) => {
      const response = await chatApi.sendMessage(api, chatId, text);
      return response.data;
    },
    onSuccess: (data) => {
        const newMessage = data.data
      queryClient.setQueryData(["chat", newMessage.chatId], (old) => {
        if (!old) return old;
        return {
          ...old,
          messages: [...(old.messages || []), newMessage],
        };
      });

      queryClient.setQueryData(["chatList"], (old = []) => {
        const chatToUpdate = old.find((chat) => chat._id === newMessage.chatId);
        if (!chatToUpdate) return old;

        const updatedChat = {
          ...chatToUpdate,
          lastMessage: newMessage.text || newMessage.type,
          lastMessageSentAt: newMessage.createdAt,
        };

        return [updatedChat, ...old.filter((chat) => chat._id !== newMessage.chatId)];
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to send message");
    },
  });
};