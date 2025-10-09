import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { categoryApi } from '../../api/categoryApi';

const getCategories = async (api) => {
  try {
    const res = await categoryApi.getCategories(api);
    const categories = res.data
    return categories;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useGetCategories = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await getCategories(api);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};