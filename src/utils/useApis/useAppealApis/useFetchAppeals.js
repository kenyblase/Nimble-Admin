import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { appealApi } from '../../api/appealApi';
import toast from 'react-hot-toast';

const fetchAppeals = async (api, page, type, limit, search, filter) => {
  try {
    const res = await appealApi.getAppeals(api, page, type, limit, search, filter);
    return  res.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Appeals')
  }
};

const fetchAppeal = async (api, id) => {
  try {
    const res = await appealApi.getAppeal(api, id);
    const category = res.data
    return category;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useFetchAppeals = (type='appeal', page=1, limit=10, search='', filter = '') => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['appealList', page, search, filter, type],
    queryFn: async () => {
      return await fetchAppeals(api, page, type, limit, search, filter);
    },
    placeholderData: (prev) => prev,
  });
};

export const useFetchAppeal = (id) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['appeal', id],
    queryFn: async () => {
      return await fetchAppeal(api, id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};