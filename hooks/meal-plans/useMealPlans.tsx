import { useQuery } from "@tanstack/react-query";
import { getMealPlans } from "@/lib/services/mealPlanService";

export default function useMealPlans(userId: string, selectedDate: Date) {
  const formattedDate = selectedDate.toISOString().split("T")[0];

  const { isLoading, data, error } = useQuery({
    queryKey: ["meal-plans", userId],
    enabled: !!userId,
    queryFn: () => getMealPlans(userId, formattedDate),
  });
  return {
    isLoading,
    mealPlan: data,
    error,
  };
}
