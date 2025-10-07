import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { dashboardApi } from '../../api/dashboardApi';

const getLatestTransactions = async (api, page = 1, limit = 10) => {
  try {
    const res = await dashboardApi.getLatestTransactions(api, page, limit);
    const transactionsData = res.data;
    return transactionsData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const useGetLatestTransactions = (page = 1, limit = 10) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['latestTransactions', page, limit],
    queryFn: async () => {
      return await getLatestTransactions(api, page, limit)
    },
    retry: false,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};