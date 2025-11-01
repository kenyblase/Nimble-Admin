import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { orderApi } from '../../api/orderApi';
import toast from 'react-hot-toast';

const fetchOrders = async (api, page, limit, search, filter) => {
  try {
    const res = await orderApi.fetchOrders(api, page, limit, search, filter);
    return  res.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Admins')
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

export const useFetchOrders = (page=1, limit=10, search='', filter = '') => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['orderList', page, search, filter],
    queryFn: async () => {
      return await fetchOrders(api, page, limit, search, filter);
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