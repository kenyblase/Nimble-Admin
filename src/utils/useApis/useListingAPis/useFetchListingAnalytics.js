import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { listingApi } from '../../api/listingApi';
import toast from 'react-hot-toast';

const fetchListingAnalytics = async (api) => {
  try {
    const res = await listingApi.fetchListingAnalytics(api);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Listing Analytics')
  }
};

export const useFetchListingAnalytics = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['listingAnalytics'],
    queryFn: async () => {
      return await fetchListingAnalytics(api);
    },
  });
};