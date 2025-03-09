import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateRecipe as updateRecipeApi } from "@/lib/services/recipeService";

export default function useUpdateRecipe() {
  const queryClient = useQueryClient();
  const { mutate: updateRecipe, isPending: isUpdating } = useMutation({
    mutationFn: ({ tried, recipeId }: { tried: boolean; recipeId: string }) => {
      return updateRecipeApi(tried, recipeId);
    },
    onSuccess: (data, variables) => {
      toast.success(
        `Recipe marked as ${variables.tried ? "tried" : "not tried yet"}`
      );
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (error) => {
      toast.error("Failed to update recipe");
      console.error("Update recipe error:", error);
    },
  });

  return {
    isUpdating,
    updateRecipe,
  };
}
