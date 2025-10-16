import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { adminApi } from "../../api/adminApi";

export const useAddAdmin = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await adminApi.addAdmin(api, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin Created successfully!");
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Admin Signup failed.");
    },
  });

  const addAdmin = async(data) => {

    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    addAdmin,
    isCreating: mutation.isPending,
  };
};