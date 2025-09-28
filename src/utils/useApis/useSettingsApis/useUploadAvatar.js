import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { settingsApi } from "../../api/settingsApi";
import toast from "react-hot-toast";

export const useUploadAvatar = () => {
  const api = useApiClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await settingsApi.uploadAvatar(api, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Profile photo uploaded successfully!");
    },
    onError: (error) => {
      toast.error( error.response?.data?.message || "upload failed.");
    },
  });

  const uploadAvatar = async(data) => {
    if (!data.selectedImage) {
      toast.error('Image Required')
      return;
    }

    const response = await mutation.mutateAsync(data);  
    
    return response.data
  };

  return {
    uploadAvatar,
    isUploading: mutation.isPending,
  };
};
