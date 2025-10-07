import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { dashboardApi } from '../../api/dashboardApi';

const getDashboardAnalytics = async (api) => {
  try {
    const res = await dashboardApi.getDashboardAnalytics(api);
    const dashboardAnalytics = res.data.data;
    return dashboardAnalytics;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useGetDashboardAnalytics = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['dashboardAnalytics'],
    queryFn: async () => {
      return await getDashboardAnalytics(api);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};