import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { categoryApi } from "../../api/categoryApi";
import toast from "react-hot-toast";

export const useUpdateCategory = () => {
  const api = useApiClient('multipart/form-data');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({id, data}) => {
      const response = await categoryApi.updateCategory(api, id, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries(["category", data._id]);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Failed to update category.");
    },
  });

  const updateCategory = async(id, data) => {
    const response = await mutation.mutateAsync({id, data}); 
    
    return response.data
  };

  return {
    updateCategory,
    isUpdating: mutation.isPending,
  };
};
