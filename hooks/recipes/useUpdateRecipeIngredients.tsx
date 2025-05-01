import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addIngredientsToRecipe,
  deleteIngredientsFromRecipe,
  updateIngredientQuantities,
} from "@/lib/services/recipeService";
import { Ingredient } from "@/components/recipe/IngredientsManager";
import toast from "react-hot-toast";

export function useUpdateRecipeIngredients(recipeId: string) {
  const queryClient = useQueryClient();

  // Add ingredients
  const addMutation = useMutation({
    mutationFn: (newIngredients: Ingredient[]) =>
      addIngredientsToRecipe(recipeId, newIngredients),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipe", recipeId],
      });
    },
    onError: () => {
      toast.error("Failed to add ingredients");
    },
  });

  // Delete ingredients
  const deleteMutation = useMutation({
    mutationFn: (ingredientIds: string[]) =>
      deleteIngredientsFromRecipe(recipeId, ingredientIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipe", recipeId],
      });
    },
    onError: () => {
      toast.error("Failed to delete ingredients");
    },
  });

  // Update quantities
  const updateMutation = useMutation({
    mutationFn: (updatedIngredients: Ingredient[]) =>
      updateIngredientQuantities(recipeId, updatedIngredients),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipe", recipeId],
      });
    },
    onError: () => {
      toast.error("Failed to update ingredient quantities");
    },
  });

  return { addMutation, deleteMutation, updateMutation };
}
