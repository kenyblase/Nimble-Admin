import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { categoryApi } from "../../api/categoryApi";
import toast from "react-hot-toast";

export const useToggleCategoryActiveStatus = () => {
  const api = useApiClient();
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await categoryApi.toggleCategoryActiveStatus(api, id);
      return response.data;
    },
    onSuccess: (data) => {
        queryClient.setQueryData(["category", data.data._id], (oldData) => {
            if (!oldData) return data.data;
            return {
                ...oldData,
                category: {
                    ...oldData.category,
                    isActive: data.data.isActive,
                },
            };
        });
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Failed to toggle active status.");
    },
  });

  const toggleCategoryActiveStatus = async(id) => {
    const response = await mutation.mutateAsync(id);  
    
    return response.data
  };

  return {
    toggleCategoryActiveStatus,
    isToggling: mutation.isPending,
  };
};
