import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { adminApi } from "../../api/adminApi";

export const useEditAdmin = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await adminApi.editAdmin(api, data._id, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin Info Updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Update failed.");
    },
  });

  const editAdmin = async(data) => {

    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    editAdmin,
    isEditing: mutation.isPending,
  };
};