import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addRecipe as addRecipeApi } from "@/lib/services/recipeService";
import { RecipeAddFormValues } from "@/components/recipe/RecipeAddForm";

export default function useAddRecipe() {
  const queryClient = useQueryClient();
  const { mutate: addRecipe, isPending: isAdding } = useMutation({
    mutationFn: (recipeData: RecipeAddFormValues) => addRecipeApi(recipeData),
    onSuccess: () => {
      toast.success("Recipe added successfully");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (error) => {
      toast.error("Failed to add recipe");
      console.error("Add recipe error:", error);
    },
  });

  return {
    isAdding,
    addRecipe,
  };
}
