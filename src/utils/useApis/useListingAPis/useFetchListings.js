import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { listingApi } from '../../api/listingApi';
import toast from 'react-hot-toast';

const fetchListings = async (api, page, limit, type, status) => {
  try {
    const res = await listingApi.fetchListings(api, page, limit, type, status);
    return  res.data.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Listings')
  }
};

const fetchListing = async (api, id) => {
  try {
    const res = await listingApi.fetchListing(api, id);
    const listing = res.data
    return listing;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useFetchListings = (page=1, limit=10, type, status) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['listings', page, status, type],
    queryFn: async () => {
      return await fetchListings(api, page, limit, type, status)
    },
    placeholderData: (prev) => prev,
  });
};

export const useFetchListing = (id) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      return await fetchListing(api, id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};