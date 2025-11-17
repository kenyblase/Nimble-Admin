import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { payoutApi } from '../../api/payoutApi';
import toast from 'react-hot-toast';

const fetchPayouts = async (api, page, limit, search, filter) => {
  try {
    const res = await payoutApi.fetchPayouts(api, page, limit, search, filter);
    return  res.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Admins')
  }
};

const fetchPayout = async (api, id) => {
  try {
    const res = await payoutApi.fetchPayout(api, id);
    const payout = res.data
    return payout;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useFetchPayouts = (page=1, limit=10, search='', filter = '') => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['payoutList', page, search, filter],
    queryFn: async () => {
      return await fetchPayouts(api, page, limit, search, filter);
    },
    placeholderData: (prev) => prev,
  });
};

export const useFetchPayout = (id) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['payout', id],
    queryFn: async () => {
      return await fetchPayout(api, id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};