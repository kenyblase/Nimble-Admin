import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { categoryApi } from "../../api/categoryApi";
import toast from "react-hot-toast";

export const useCreateCategory = () => {
  const api = useApiClient('multipart/form-data');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await categoryApi.createCategory(api, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Failed to create category.");
    },
  });

  const createCategory = async(data) => {
    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    createCategory,
    isCreating: mutation.isPending,
  };
};
