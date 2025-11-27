import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { reportApi } from '../../api/reportApi';
import toast from 'react-hot-toast';

const fetchReports = async (api, page, type, limit, search, filter) => {
  try {
    const res = await reportApi.getReports(api, page, type, limit, search, filter);
    return  res.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Reports')
  }
};

const fetchReport = async (api, id) => {
  try {
    const res = await reportApi.getReport(api, id);
    const category = res.data
    return category;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useFetchReports = (type='report', page=1, limit=10, search='', filter = '') => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['reportList', page, search, filter, type],
    queryFn: async () => {
      return await fetchReports(api, page, type, limit, search, filter);
    },
    placeholderData: (prev) => prev,
  });
};

export const useFetchReport = (id) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['report', id],
    queryFn: async () => {
      return await fetchReport(api, id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};