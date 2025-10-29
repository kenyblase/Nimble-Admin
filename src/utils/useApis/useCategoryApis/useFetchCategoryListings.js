import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { categoryApi } from '../../api/categoryApi';
import toast from 'react-hot-toast';

const fetchCategoryListings = async (api, id, page, limit, status) => {
  try {
    const res = await categoryApi.fetchCategoryListings(api, id, page, limit, status);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching User Listings')
  }
};

export const useFetchCategoryListings = (id, page=1, limit=10, status) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['categoryListings', id, page, status],
    queryFn: async () => {
      return await fetchCategoryListings(api, id, page, limit, status)
    },
    placeholderData: (prev) => prev,
  });
};