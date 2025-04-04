import { useQuery } from "@tanstack/react-query";
import { getPlanRecipes } from "@/lib/services/mealPlanService";

export default function usePlanRecipes(userId: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["mealPlanRecipes", userId],
    enabled: !!userId,
    queryFn: () => getPlanRecipes(userId),
  });
  return {
    isLoading,
    recipes: data || [],
    error,
  };
}
