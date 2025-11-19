import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { payoutApi } from "../../api/payoutApi";

export const useApprovePayout = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await payoutApi.approvePayout(api, id);
      return response.data;
    },

    onSuccess: (data) => {
      const updatedPayout = data.data;

      queryClient.setQueryData(['payout', updatedPayout._id], (oldData) => {
        if (!oldData) return oldData;
        return {
            ...oldData, status: updatedPayout.status ,
        };
      });

      queryClient.setQueriesData({ queryKey: ['payoutList'] }, (old) => {
        if (!old) return old;

       if (Array.isArray(old?.withdrawals)) {
          return {
            ...old,
            withdrawals: old.withdrawals.map((payout) =>
              payout._id === updatedPayout._id
                ? { ...payout, status: updatedPayout.status }
                : payout
            ),
          };
        }

        return old;
      });

      toast.success(data.message || "Payout status updated successfully!");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update payout status.");
    },
  });

  const approvePayout = async (id) => {
    const response = await mutation.mutateAsync(id);
    return response.data;
  };

  return {
    approvePayout,
    isApproving: mutation.isPending,
  };
};