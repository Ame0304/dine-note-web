import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/services/dashboardService";

export default function useAnalytics(userId: string) {
  const { data, error } = useQuery({
    queryKey: ["analytics", userId],
    queryFn: () => fetchDashboardData(userId),
    enabled: !!userId,
  });

  return {
    analytics: data,
    error,
  };
}
