import { useQuery } from "@tanstack/react-query";
import { getRecipes, Recipe } from "@/lib/services/recipeService";
import { PAGE_SIZE } from "@/lib/constants";

interface RecipesResponse {
  recipes: Recipe[];
  count: number | null;
}

export function useRecipes(userId: string | undefined, page = 1) {
  const { isLoading, data, error } = useQuery<RecipesResponse>({
    queryKey: ["recipes", userId, page, PAGE_SIZE],
    queryFn: () => getRecipes({ userId, page }),
    enabled: !!userId,
    staleTime: 60000, // Data stays fresh for 1 minute
  });

  return {
    isLoading,
    recipes: data?.recipes || [],
    error,
    count: data?.count || 0,
  };
}
