import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMealToPlan as addMealToPlanApi,
  AddMealToPlanParams,
  MealPlanItem,
  PlanRecipe,
} from "@/lib/services/mealPlanService";
import toast from "react-hot-toast";
import { generateDateKey } from "@/lib/helpers";

interface AddMealOptimisticParams extends AddMealToPlanParams {
  recipeData: PlanRecipe; // Include the full recipe data
}

interface CachedMealPlan {
  mealPlanId: string;
  meals: MealPlanItem[];
}

export default function useAddMealToPlan() {
  const queryClient = useQueryClient();
  const { mutate: addMealToPlan, isPending: isAdding } = useMutation({
    mutationFn: ({
      userId,
      date,
      mealType,
      recipeId,
    }: AddMealOptimisticParams) =>
      addMealToPlanApi({ userId, date, mealType, recipeId }),

    // Optimistic update
    onMutate: async (newMealInfo) => {
      const { userId, date, mealType, recipeData } = newMealInfo;
      const queryKey = ["mealPlans", userId, generateDateKey(new Date(date))];

      // 1. Cancel ongoing refetches
      await queryClient.cancelQueries({ queryKey });

      // 2. Snapshot the previous value
      const previousMealPlan =
        queryClient.getQueryData<CachedMealPlan>(queryKey);

      // 3. Optimistically update to the new value
      queryClient.setQueryData<CachedMealPlan>(queryKey, (old) => {
        const optimisticMeal = {
          // Use a temporary ID for the optimistic item
          id: `optimistic-${Date.now()}`,
          completed: false,
          recipe: recipeData,
          meal_type: mealType,
        };

        if (old) {
          // If a plan exists, add the meal to it
          return {
            ...old,
            meals: [...old.meals, optimisticMeal],
          };
        } else {
          return {
            mealPlanId: `optimistic-plan-${Date.now()}`, // Temporary plan ID
            meals: [optimisticMeal],
          };
        }
      });

      // 4. Return a context object with the snapshotted value
      return { previousMealPlan };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error, newMealInfo, context) => {
      const { userId, date } = newMealInfo;
      const queryKey = ["mealPlans", userId, generateDateKey(new Date(date))];
      if (context?.previousMealPlan) {
        queryClient.setQueryData(queryKey, context.previousMealPlan);
      } else {
        // If there was no previous plan, remove the optimistic one
        queryClient.removeQueries({ queryKey });
      }
      toast.error("Failed to add meal to plan");
      console.error("Add meal to plan error:", error);
    },
    // Always refetch after error or success to ensure server state
    onSettled: (data, error, newMealInfo) => {
      const { userId, date } = newMealInfo;
      const queryKey = ["mealPlans", userId, generateDateKey(new Date(date))];
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    isAdding,
    addMealToPlan,
  };
}
