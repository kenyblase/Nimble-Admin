import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../api/apiClient';
import { notificationApi } from '../../api/notificationApi';
import toast from 'react-hot-toast';

const fetchNotifications = async (api, page, limit) => {
  try {
    const res = await notificationApi.fetchNotifications(api, page, limit);
    return  res.data
  } catch (error) {
    toast.error( error.response?.data?.message || 'Error Fetching Notifications')
  }
};

// const fetchUser = async (api, id) => {
//   try {
//     const res = await userApi.fetchUser(api, id);
//     const user = res.data
//     return user;
//   } catch (err) {
//     console.log(err)
//     return null;
//   }
// };

export const useFetchNotifications = (page=1, limit=10) => {
  const api = useApiClient();

  return useQuery({
    queryKey: ['notificationList', page],
    queryFn: async () => {
      return await fetchNotifications(api, page, limit);
    },
    placeholderData: (prev) => prev,
  });
};

// export const useFetchUser = (id) => {
//   const api = useApiClient();

//   return useQuery({
//     queryKey: ['user', id],
//     queryFn: async () => {
//       return await fetchUser(api, id);
//     },
//     enabled: !!id,
//     retry: false,
//     staleTime: 5 * 60 * 1000,
//   });
// };