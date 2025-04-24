import { Order, updateOrderStatus } from "@/lib/services/orderService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateOrder() {
  const queryClient = useQueryClient();
  const { mutate: updateOrder, isPending: isUpdating } = useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: "accepted" | "declined";
    }) => updateOrderStatus(orderId, status),
    onMutate: async ({ orderId, status }) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      const previousOrders = queryClient.getQueryData(["orders"]);

      // Optimistically update the UI
      queryClient.setQueriesData({ queryKey: ["orders"] }, (old: Order[]) => {
        if (!old) return old;

        return old.map((order) => {
          if (order.id === orderId) {
            return { ...order, status };
          }
          return order;
        });
      });

      return { previousOrders };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, revert back to the previous value
      if (context?.previousOrders) {
        queryClient.setQueriesData(
          { queryKey: ["orders"] },
          context.previousOrders
        );
      }
      console.error("Error updating order status:", err);
      toast.error("Error updating order status", { duration: 3000 });
    },
    onSettled: () => {
      // Always invalidate the cache to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { updateOrder, isUpdating };
}
