import { useQuery } from "@tanstack/react-query";
import { getMealPlans } from "@/lib/services/mealPlanService";
import { format } from "date-fns";

export default function useMealPlans(userId: string, selectedDate: Date) {
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const { isLoading, data, error } = useQuery({
    queryKey: ["mealPlans", userId, formattedDate],
    enabled: !!userId,
    queryFn: () => getMealPlans(userId, formattedDate),
  });
  return {
    isLoading,
    mealPlan: data,
    error,
  };
}
