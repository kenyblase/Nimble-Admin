import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../api/store/useAuthStore';
import { useApiClient } from '../../api/apiClient';

const fetchAdmin = async (api, setAndAuthenticateAdmin, logout) => {
  try {
    const res = await api.get('/auth/check-auth');
    const adminData = res.data.user;
    setAndAuthenticateAdmin(adminData);
    return adminData;
  } catch (err) {
    console.log(err)
    logout();
    return null;
  }
};

export const useCheckAuth = () => {
  const { admin, setAndAuthenticateAdmin, logout } = useAuthStore();
  const api = useApiClient();

  return useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      if (admin) return admin;
      return await fetchAdmin(api, setAndAuthenticateAdmin, logout);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};