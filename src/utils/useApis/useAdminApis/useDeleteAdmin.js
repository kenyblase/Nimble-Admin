import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { adminApi } from "../../api/adminApi";

export const useDeleteAdmin = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await adminApi.deleteAdmin(api, data._id, {password: data.password});
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin Deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Failed to delete admin.");
    },
  });

  const deleteAdmin = async(data) => {

    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    deleteAdmin,
    isDeleting: mutation.isPending,
  };
};