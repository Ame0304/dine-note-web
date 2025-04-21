import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  removeMealFromPlan,
  MealPlanItem,
} from "@/lib/services/mealPlanService";
import { generateDateKey } from "@/lib/helpers";

interface CachedMealPlan {
  mealPlanId: string;
  meals: MealPlanItem[];
}

interface DeleteMealOptimisticParams {
  mealPlanItemId: string;
  userId: string;
  selectedDate: Date;
}

export default function useDeleteMeal() {
  const queryClient = useQueryClient();
  const { mutate: deleteMeal, isPending: isDeleting } = useMutation({
    mutationFn: ({ mealPlanItemId }: DeleteMealOptimisticParams) =>
      removeMealFromPlan(mealPlanItemId),
    onMutate: async (variables) => {
      const { mealPlanItemId, userId, selectedDate } = variables;
      const formattedDate = generateDateKey(selectedDate);
      const queryKey = ["mealPlans", userId, formattedDate];

      await queryClient.cancelQueries({ queryKey });
      const previousMealPlan =
        queryClient.getQueryData<CachedMealPlan>(queryKey);
      queryClient.setQueryData<CachedMealPlan>(queryKey, (old) => {
        if (!old) return undefined;

        return {
          ...old,
          meals: old.meals.filter((meal) => meal.id !== mealPlanItemId),
        };
      });

      // Return context with previous data and the key
      return { previousMealPlan };
    },
    onError: (error, variables, context) => {
      const { userId, selectedDate } = variables;
      const formattedDate = generateDateKey(selectedDate);
      const queryKey = ["mealPlans", userId, formattedDate];

      // Use the context to roll back
      if (context?.previousMealPlan) {
        queryClient.setQueryData(queryKey, context.previousMealPlan);
      }
      toast.error("Failed to delete meal" + error.message);
      console.error("Delete meal error", error);
    },
    onSettled: (data, error, variables) => {
      const { userId, selectedDate } = variables;
      const formattedDate = generateDateKey(selectedDate);
      const queryKey = ["mealPlans", userId, formattedDate];
      // Invalidate the specific query to refetch from server
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    isDeleting,
    deleteMeal,
  };
}
