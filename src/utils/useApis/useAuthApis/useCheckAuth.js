import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../api/store/useAuthStore';
import { useApiClient } from '../../api/apiClient';

const fetchAdmin = async (api, loginSucess, logout) => {
  try {
    const res = await api.get('/auth/me');
    const adminData = res.data.data;
    loginSucess(adminData);
    return adminData;
  } catch (err) {
    logout();
    return null;
  }
};

export const useCheckAuth = () => {
  const { admin, loginSuccess, logout } = useAuthStore();
  const api = useApiClient();

  return useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      if (admin) return admin;
      return await fetchAdmin(api, loginSuccess, logout);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};