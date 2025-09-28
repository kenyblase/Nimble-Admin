import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { authApi } from "../../api/authApi";
import toast from "react-hot-toast";

export const useRegisterAdmin = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await authApi.register(api, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin Added successfully!");
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Failed to add admin.");
    },
  });

  const registerAdmin = async(adminData) => {
    if(!adminData.email || !adminData.fullName || !adminData.dateOfBirth || !adminData.gender || !adminData.role || !adminData.password){
      toast.error('Incomplete Admin Data')
      return;
    }

    const response = await mutation.mutateAsync(adminData);  
    
    return response.data
  };

  return {
    registerAdmin,
    isregistering: mutation.isPending,
  };
};