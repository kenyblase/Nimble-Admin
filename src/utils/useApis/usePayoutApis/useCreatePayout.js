import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { payoutApi } from "../../api/payoutApi";

export const useCreatePayout = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await payoutApi.createPayout(api, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Payout Created successfully!");
      queryClient.invalidateQueries({ queryKey: ['payoutList'] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Failed to create Payout.");
    },
  });

  const createpayout = async(data) => {

    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    createpayout,
    isCreating: mutation.isPending,
  };
};