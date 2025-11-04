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

const fetchOrder = async (api, id) => {
  try {
    const res = await orderApi.fetchOrder(api, id);
    const category = res.data
    return category;
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

export const useFetchOrder = (id) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      return await fetchOrder(api, id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};