import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { payoutApi } from '../../api/payoutApi';
import toast from 'react-hot-toast';

const fetchPayoutAnalytics = async (api) => {
  try {
    const res = await payoutApi.fetchPayoutAnalytics(api);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Payout Analytics')
  }
};

export const useFetchPayoutAnalytics = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['payoutAnalytics'],
    queryFn: async () => {
      return await fetchPayoutAnalytics(api);
    },
  });
};