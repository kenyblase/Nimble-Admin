import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { authApi } from "../../api/authApi";
import toast from "react-hot-toast";

export const useEmailCheck = () => {
  const api = useApiClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await authApi.checkAdminEmail(api, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Confirmation successful!");
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Check failed.");
    },
  });

  const emailCheck = async(data) => {
    if (!data.email) {
      toast.error('Email Required')
      return;
    }

    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    emailCheck,
    isCheckingEmail: mutation.isPending,
  };
};
