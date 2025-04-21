import { getRecipeById, Recipe } from "@/lib/services/recipeService";
import { useQuery } from "@tanstack/react-query";

export function useRecipe(recipeId: string) {
  const { data, isLoading, error } = useQuery<Recipe | null>({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeById(recipeId),
    enabled: !!recipeId,
  });

  return { recipe: data, isLoading, error };
}
