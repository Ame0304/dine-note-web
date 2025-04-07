import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMealToPlan as addMealToPlanApi,
  AddMealToPlanParams,
} from "@/lib/services/mealPlanService";
import toast from "react-hot-toast";

export default function useAddMealToPlan() {
  const queryClient = useQueryClient();
  const { mutate: addMealToPlan, isPending: isAdding } = useMutation({
    mutationFn: ({ userId, date, mealType, recipeId }: AddMealToPlanParams) =>
      addMealToPlanApi({ userId, date, mealType, recipeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealPlans"] });
      toast.success("Meal added to plan successfully");
    },
    onError: (error) => {
      toast.error("Failed to add meal to plan");
      console.error("Add meal to plan error:", error);
    },
  });

  return {
    isAdding,
    addMealToPlan,
  };
}
