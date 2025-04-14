import { toggleMealCompleted } from "@/lib/services/mealPlanService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export default function useToggleCompleted() {
  const queryClient = useQueryClient();
  const { mutate: toggleCompleted, isPending: isUpdating } = useMutation({
    mutationFn: ({
      mealPlanItemId,
      completed,
    }: {
      mealPlanItemId: string;
      completed: boolean;
    }) => toggleMealCompleted(mealPlanItemId, completed),
    onSuccess: (data, variables) => {
      toast.success(
        `Meal marked as ${variables.completed ? "completed" : "not completed"}`,
        { duration: 4000 }
      );

      queryClient.invalidateQueries({
        queryKey: ["mealPlans"],
      });

      if (data.recipeStatusChanged) {
        queryClient.invalidateQueries({
          queryKey: ["recipes"],
        });

        queryClient.invalidateQueries({
          queryKey: ["recipe", data.recipeId],
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to update this meal plan");
      console.error("Update meal plan error:", error);
    },
  });

  return { isUpdating, toggleCompleted };
}
