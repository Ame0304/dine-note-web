import { getOrders } from "@/lib/services/orderService";
import { useQuery } from "@tanstack/react-query";

export default function useOrders(userId: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", userId],
    enabled: !!userId,
    queryFn: () => getOrders(userId),
  });

  return {
    isLoading,
    orders: data,
    error,
  };
}
