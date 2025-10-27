import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { listingApi } from '../../api/listingApi';
import toast from 'react-hot-toast';

const fetchListingAnalytics = async (api, type) => {
  try {
    const res = await listingApi.fetchListingAnalytics(api, type);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Listing Analytics')
  }
};

export const useFetchListingAnalytics = (type) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['listingAnalytics', type],
    queryFn: async () => {
      return await fetchListingAnalytics(api, type);
    },
  });
};