import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import { settingsApi } from "../../api/settingsApi";

export const useUpdateSetting = (key) => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value) => {
      const res = await settingsApi.updateSettingByKey(api, key, value);
      return res.data.data;
    },

    onSuccess: (updatedSetting) => {
      queryClient.setQueryData(["setting", key], updatedSetting);
    }
  });
};
