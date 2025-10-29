import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { dashboardApi } from '../../api/dashboardApi';

const getLatestTransactions = async (api, page = 1, limit = 10, status, search) => {
  try {
    const res = await dashboardApi.getLatestTransactions(api, page, limit, status, search);
    const transactionsData = res.data;
    return transactionsData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const useGetLatestTransactions = (page = 1, limit = 10, status, search) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['latestTransactions', page, limit, status, search],
    queryFn: async () => {
      return await getLatestTransactions(api, page, limit, status, search)
    },
    retry: false,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};