import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { categoryApi } from '../../api/categoryApi';

export const useGetTotalCommission = (filter = 'today') => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['totalCommission', filter],
    queryFn: async () => {
      const res = await categoryApi.getTotalCommission(api, filter);
      return res.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useGetCategoryCommission = (categoryId = '', filter = 'today') => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['categoryCommission', categoryId, filter],
    queryFn: async () => {
      const res = await categoryApi.getCategoryCommission(api, categoryId, filter);
      return res.data;
    },
    enabled: categoryId !== undefined, // allows it to run even when categoryId is empty
    keepPreviousData: true,
  });
};