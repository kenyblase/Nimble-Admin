import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { userApi } from "../../api/userApi";
import { listingApi } from "../../api/listingApi";

export const useToggleProductStatus = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await listingApi.toggleProductStatus(api, id, status);
      return response.data;
    },

    onSuccess: (data) => {
      const updatedProduct = data.data;

      queryClient.setQueryData(['listing', updatedProduct._id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          status: updatedProduct.status
        };
      });

      queryClient.setQueriesData({ queryKey: ['listings'] }, (old) => {
        if (!old || !old.products) return old;

        return {
            ...old,
            products: old.products.map((product) =>
            product._id === updatedProduct._id
                ? { ...product, status: updatedProduct.status }
                : product
            ),
        };
      });

      toast.success(data.message || "User status updated successfully!");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status.");
    },
  });

  const toggleProductStatus = async (id, status) => {
    const response = await mutation.mutateAsync({ id, status });
    return response.data;
  };

  return {
    toggleProductStatus,
    isToggling: mutation.isPending,
  };
};