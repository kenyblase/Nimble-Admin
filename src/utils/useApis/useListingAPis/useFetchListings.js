import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { listingApi } from '../../api/listingApi';
import toast from 'react-hot-toast';

const fetchListings = async (api, page, limit, status) => {
  try {
    const res = await listingApi.fetchListings(api, page, limit, status);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Listings')
  }
};

const fetchUser = async (api, id) => {
  try {
    const res = await userApi.fetchUser(api, id);
    const category = res.data
    return category;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useFetchListings = (page=1, limit=10, status) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['listings', page, status],
    queryFn: async () => {
      return await fetchListings(api, page, limit, status)
    },
    placeholderData: (prev) => prev,
  });
};

export const useFetchUser = (id) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      return await fetchUser(api, id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};