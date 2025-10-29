import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { userApi } from '../../api/userApi';
import toast from 'react-hot-toast';

const fetchUserListings = async (api, id, page, limit, status) => {
  try {
    const res = await userApi.fetchUserListings(api, id, page, limit, status);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching User Listings')
  }
};

export const useFetchUserListings = (id, page=1, limit=10, status) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['userListings', id, page, status],
    queryFn: async () => {
      return await fetchUserListings(api, id, page, limit, status)
    },
    placeholderData: (prev) => prev,
  });
};