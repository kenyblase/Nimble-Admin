import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { appealApi } from "../../api/appealApi";

export const useToggleAppealStatus = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await appealApi.toggleAppealStatus(api, id, status);
      return response.data;
    },

    onSuccess: (data) => {
      const updatedAppeal = data.data;

      queryClient.setQueryData(['appeal', updatedAppeal._id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
           status: updatedAppeal.status,
        };
      });

      queryClient.setQueriesData({ queryKey: ['appealList'] }, (old) => {
        if (!old) return old;

        if (Array.isArray(old)) {
          return {
            ...old,
            appeals: old.appeals.map((appeal) =>
              appeal._id === updatedAppeal._id
                ? { status: updatedAppeal.status }
                : appeal
            ),
          };
        }

        return old;
      });

      toast.success(data.message || "Appeal status updated successfully!");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status.");
    },
  });

  const toggleAppealStatus = async (id, status) => {
    const response = await mutation.mutateAsync({ id, status });
    return response.data;
  };

  return {
    toggleAppealStatus,
    isToggling: mutation.isPending,
  };
};