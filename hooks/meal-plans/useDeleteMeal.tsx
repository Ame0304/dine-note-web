import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { removeMealFromPlan } from "@/lib/services/mealPlanService";

export default function useDeleteMeal() {
  const queryClient = useQueryClient();
  const { mutate: deleteMeal, isPending: isDeleting } = useMutation({
    mutationFn: removeMealFromPlan,
    onSuccess: () => {
      toast.success("Meal deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["mealPlans"] });
    },
    onError: (error) => {
      toast.error("Failed to delete meal");
      console.error(error);
    },
  });

  return {
    isDeleting,
    deleteMeal,
  };
}
