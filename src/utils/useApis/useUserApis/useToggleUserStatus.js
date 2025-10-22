import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { userApi } from "../../api/userApi";

export const useToggleUserStatus = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await userApi.toggleUserStatus(api, id, status);
      return response.data;
    },

    onSuccess: (data) => {
      const updatedUser = data.data;

      queryClient.setQueryData(['user', updatedUser._id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          user: { ...oldData.user, status: updatedUser.status },
        };
      });

      queryClient.setQueriesData({ queryKey: ['userList'] }, (old) => {
        if (!old) return old;

        if (Array.isArray(old?.users)) {
          return {
            ...old,
            users: old.users.map((user) =>
              user._id === updatedUser._id
                ? { ...user, status: updatedUser.status }
                : user
            ),
          };
        }

        return old;
      });

      toast.success(data.message || "User status updated successfully!");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status.");
    },
  });

  const toggleUserStatus = async (id, status) => {
    const response = await mutation.mutateAsync({ id, status });
    return response.data;
  };

  return {
    toggleUserStatus,
    isToggling: mutation.isPending,
  };
};