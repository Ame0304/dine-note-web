import { updateRecipeSteps } from "@/lib/services/recipeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface RecipeSteps {
  recipeId: string;
  steps: string[];
}

export default function useUpdateSteps() {
  const queryClient = useQueryClient();
  const { mutate: updateSteps, isPending: isUpdating } = useMutation({
    mutationFn: ({ recipeId, steps }: RecipeSteps) =>
      updateRecipeSteps(recipeId, steps),
    onSuccess: (data, variables) => {
      toast.success("Updated steps successfully!", {
        duration: 3000,
      });

      queryClient.invalidateQueries({
        queryKey: ["recipe", variables.recipeId],
      });
    },
    onError: () => {
      toast.error("Error updating steps", { duration: 3000 });
    },
  });

  return { updateSteps, isUpdating };
}
