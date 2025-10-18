import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { userApi } from '../../api/userApi';
import toast from 'react-hot-toast';

const fetchUsers = async (api, page, limit, search, filter) => {
  try {
    const res = await userApi.fetchUsers(api, page, limit, search, filter);
    return  res.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Admins')
  }
};

export const useFetchUsers = (page=1, limit=10, search='', filter = '') => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['userList', page, search, filter],
    queryFn: async () => {
      return await fetchUsers(api, page, limit, search, filter);
    },
    placeholderData: (prev) => prev,
  });
};