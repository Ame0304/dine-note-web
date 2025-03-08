import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteRecipe as deleteRecipeApi } from "@/lib/services/recipeService";

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  const { mutate: deleteRecipe, isPending: isDeleting } = useMutation({
    mutationFn: deleteRecipeApi,
    onSuccess: () => {
      toast.success("Recipe deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (error) => {
      toast.error("Failed to delete recipe");
      console.error(error);
    },
  });

  return {
    isDeleting,
    deleteRecipe,
  };
}
