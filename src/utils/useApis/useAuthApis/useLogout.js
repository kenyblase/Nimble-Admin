import { useQueryClient } from '@tanstack/react-query';
import {useAuthStore} from '../../api/store/useAuthStore';
import { useApiClient } from '../../api/apiClient';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const api = useApiClient() 
  const queryClient = useQueryClient();
  const clearAdmin = useAuthStore((state) => state.logout);

  const logout = async () => {
    try {
      await api.post('/auth/logout')
      clearAdmin();
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      toast.success('logged out successfully')
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return {logout};
};
