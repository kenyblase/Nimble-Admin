import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { categoryApi } from "../../api/categoryApi";
import toast from "react-hot-toast";

export const useDeleteCategory = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await categoryApi.deleteCategory(api, id);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Failed to delete category.");
    },
  });

  const deleteCategory = async(id) => {
    const response = await mutation.mutateAsync(id); 
    
    return response.data
  };

  return {
    deleteCategory,
    isDeleting: mutation.isPending,
  };
};
