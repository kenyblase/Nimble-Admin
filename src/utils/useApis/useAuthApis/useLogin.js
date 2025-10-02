import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { authApi } from "../../api/authApi";
import toast from "react-hot-toast";

export const useLogin = () => {
  const api = useApiClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await authApi.login(api, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Logged In successfully!");
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "Login failed.");
    },
  });

  const login = async(data) => {
    if (!data.email || !data.password) {
      toast.error('Email and Password Required')
      return;
    }

    const response = await mutation.mutateAsync(data);  
    
    return response.admin
  };

  return {
    login,
    isLoggingIn: mutation.isPending,
  };
};
