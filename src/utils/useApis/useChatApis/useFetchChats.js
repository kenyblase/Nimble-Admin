import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { chatApi } from '../../api/chatApi';
import toast from 'react-hot-toast';

const fetchChats = async (api) => {
  try {
    const res = await chatApi.fetchChats(api);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching chats')
  }
};

const fetchChat = async (api, id) => {
  try {
    const res = await chatApi.fetchChat(api, id);
    const chat = res.data.data
    console.log(chat)
    return chat;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useFetchChats = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['chatList'],
    queryFn: async () => {
      return await fetchChats(api);
    },
    placeholderData: (prev) => prev,
  });
};

export const useFetchChat = (id) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['chat', id],
    queryFn: async () => {
      return await fetchChat(api, id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};