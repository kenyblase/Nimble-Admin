import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useApiClient } from "../../api/apiClient";
import { orderApi } from "../../api/orderApi"; // you'll define cancel & complete here

export const useUpdateOrder = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId) => {
      const response = await orderApi.cancelOrder(api, orderId);
      return response.data;
    },
    onSuccess: (data) => {
      const updatedOrder = data.order;

      // Update individual order cache
      queryClient.setQueryData(['order', updatedOrder._id], (oldData) => {
        if (!oldData) return oldData;
        return {
            ...oldData, orderStatus: updatedOrder.orderStatus, transactionStatus: updatedOrder.transactionStatus
        };
      });

      // Update order list cache
      queryClient.setQueriesData({ queryKey: ['orderList'] }, (old) => {
        if (!old) return old;
        if (Array.isArray(old?.orders)) {
          return {
            ...old,
            orders: old.orders.map((order) =>
              order._id === updatedOrder._id
                ? { ...order, orderStatus: updatedOrder.orderStatus, transactionStatus: updatedOrder.transactionStatus }
                : order
            ),
          };
        }
        return old;
      });

      toast.success(data.message || "Order cancelled successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to cancel order.");
    },
  });

  const completeOrderMutation = useMutation({
    mutationFn: async (orderId) => {
      const response = await orderApi.completeOrder(api, orderId);
      return response.data;
    },
    onSuccess: (data) => {
      const updatedOrder = data.order;

      // Update individual order cache
      queryClient.setQueryData(['order', updatedOrder._id], (oldData) => {
      console.log(oldData)
        if (!oldData) return oldData;
        return {
        ...oldData, orderStatus: updatedOrder.orderStatus, transactionStatus: updatedOrder.transactionStatus
        };
      });

      // Update order list cache
      queryClient.setQueriesData({ queryKey: ['orderList'] }, (old) => {
        if (!old) return old;
        if (Array.isArray(old?.orders)) {
          return {
            ...old,
            orders: old.orders.map((order) =>
              order._id === updatedOrder._id
                ? { ...order, orderStatus: updatedOrder.orderStatus, transactionStatus: updatedOrder.transactionStatus }
                : order
            ),
          };
        }
        return old;
      });

      toast.success(data.message || "Order marked as completed!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to mark order as completed."
      );
    },
  });

  return {
    cancelOrder: async (orderId) => cancelOrderMutation.mutateAsync(orderId),
    completeOrder: async (orderId) => completeOrderMutation.mutateAsync(orderId),
    isCancelling: cancelOrderMutation.isPending,
    isCompleting: completeOrderMutation.isPending,
  };
};