import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../api/apiClient";
import toast from "react-hot-toast";
import { reportApi } from "../../api/reportApi";

export const useToggleReportStatus = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await reportApi.toggleReportStatus(api, id, status);
      return response.data;
    },

    onSuccess: (data) => {
      const updatedReport = data.data;

      queryClient.setQueryData(['report', updatedReport._id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
           status: updatedReport.status,
        };
      });

      queryClient.setQueriesData({ queryKey: ['reportList'] }, (old) => {
        if (!old) return old;

        if (Array.isArray(old?.reports)) {
          return {
            ...old,
            reports: old.reports.map((report) =>
              report._id === updatedReport._id
                ? { ...report, status: updatedReport.status }
                : report
            ),
          };
        }

        return old;
      });

      toast.success(data.message || "Appeal status updated successfully!");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status.");
    },
  });

  const toggleReportStatus = async (id, status) => {
    const response = await mutation.mutateAsync({ id, status });
    return response.data;
  };

  return {
    toggleReportStatus,
    isToggling: mutation.isPending,
  };
};