import { getRecipeById } from "@/lib/services/recipeService";
import { RecipeWithUsername } from "@/pages/share/recipes/[recipeId]";
import { useQuery } from "@tanstack/react-query";

export function useRecipe(recipeId: string) {
  const { data, isLoading, error } = useQuery<RecipeWithUsername | null>({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeById(recipeId),
    enabled: !!recipeId,
  });

  return { recipe: data, isLoading, error };
}
