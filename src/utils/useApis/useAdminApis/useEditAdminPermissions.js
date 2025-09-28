import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { adminApi } from "../../api/adminApi";

export const useEditAdminPermissions = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await adminApi.editAdminPermissions(api, data._id, {permissions: data.permissions, password: data.password});
      return response.data;
    },
    onSuccess: () => {
      toast.success("Permissions Updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Update failed.");
    },
  });

  const editAdminPermissions = async(data) => {

    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    editAdminPermissions,
    isUpdatingPermissions: mutation.isPending,
  };
};