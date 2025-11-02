import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { dashboardApi } from '../../api/dashboardApi';

const getTransactionAnalytics = async (api) => {
  try {
    const res = await dashboardApi.getTransactionAnalytics(api);
    const transactionAnalytics = res.data.data;
    return transactionAnalytics;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useGetTransactionAnalytics = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['transactionAnalytics'],
    queryFn: async () => {
      return await getTransactionAnalytics(api);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};