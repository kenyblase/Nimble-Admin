import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { orderApi } from '../../api/orderApi';
import toast from 'react-hot-toast';

const fetchOrderAnalytics = async (api) => {
  try {
    const res = await orderApi.fetchOrderAnalytics(api);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching User Analytics')
  }
};

export const useFetchOrderAnalytics = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['orderAnalytics'],
    queryFn: async () => {
      return await fetchOrderAnalytics(api);
    },
  });
};