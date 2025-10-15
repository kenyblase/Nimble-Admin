import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { categoryApi } from '../../api/categoryApi';

const getAllCategories = async (api) => {
  try {
    const res = await categoryApi.getAllCategories(api);
    const categories = res.data
    return categories;
  } catch (err) {
    console.log(err)
    return null;
  }
};

const getCategory = async (api, id) => {
  try {
    const res = await categoryApi.getCategory(api, id);
    const category = res.data
    return category;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const useGetAllCategories = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      return await getAllCategories(api);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCategory = (id) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      return await getCategory(api, id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCategoriesWithProductCount = (page, limit, search) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ["categories", page, limit, search],
    queryFn: async () => {
      const res = await categoryApi.getCategoriesWithProductCount(api, page, limit, search);
      return res.data;
    },
    keepPreviousData: true,
  });
};