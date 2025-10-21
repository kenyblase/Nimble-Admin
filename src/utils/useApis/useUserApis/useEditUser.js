import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { userApi } from "../../api/userApi";

export const useEditUser = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await userApi.editUser(api, data.id, data.data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User Info Updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['userList'] });
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Update failed.");
    },
  });

  const editUser = async(id, data) => {

    const response = await mutation.mutateAsync({id, data});  
    
    return response.data
  };

  return {
    editUser,
    isEditing: mutation.isPending,
  };
};