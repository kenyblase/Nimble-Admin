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