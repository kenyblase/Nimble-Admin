import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { authApi } from "../../api/authApi";
import toast from "react-hot-toast";

export const useSetNewPassword = () => {
  const api = useApiClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await authApi.setNewPassword(api, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account setup successfully!");
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Password setup failed.");
    },
  });

  const setNewPassword = async(data) => {
    if (!data.email || !data.password) {
      toast.error('Email and Password Required')
      return;
    }

    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    setNewPassword,
    isSettingPassword: mutation.isPending,
  };
};
