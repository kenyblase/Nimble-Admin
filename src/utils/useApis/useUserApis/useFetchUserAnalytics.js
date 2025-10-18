import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { userApi } from '../../api/userApi';
import toast from 'react-hot-toast';

const fetchUserAnalytics = async (api) => {
  try {
    const res = await userApi.fetchUserAnalytics(api);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching User Analytics')
  }
};

export const useFetchUserAnalytics = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['userAnalytics'],
    queryFn: async () => {
      return await fetchUserAnalytics(api);
    },
  });
};