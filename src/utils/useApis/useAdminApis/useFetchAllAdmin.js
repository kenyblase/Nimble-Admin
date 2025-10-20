import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { adminApi } from '../../api/adminApi';
import toast from 'react-hot-toast';

const fetchAllAdmin = async (api, page, limit, search) => {
  try {
    const res = await adminApi.fetchAllAdmins(api, page, limit, search);
    return  res.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Admins')
  }
};

export const useFetchAllAdmins = (page=1, limit=10, search='') => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['adminList', page, search],
    queryFn: async () => {
      return await fetchAllAdmin(api, page, limit, search);
    },
    placeholderData: (prev) => prev,
  });
};