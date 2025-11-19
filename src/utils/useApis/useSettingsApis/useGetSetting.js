import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { settingsApi } from '../../api/settingsApi';

const getSetting = async (api, key) => {
  try {
    const res = await settingsApi.getSettingByKey(api, key);
    const setting = res.data.data
    return setting;
  } catch (err) {
    console.log(err)
    return null;
  }
};


export const useGetSetting = (key) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['setting', key],
    queryFn: async () => {
      return await getSetting(api, key);
    },
    enabled: !!key,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};