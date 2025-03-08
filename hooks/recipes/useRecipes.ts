import { useQuery } from "@tanstack/react-query";
import { getRecipes, Recipe } from "@/lib/services/recipeService";

export function useRecipes(
  userId: string | undefined,
  page = 1,
  pageSize = 12
) {
  const {
    isLoading,
    data: recipes,
    error,
  } = useQuery<Recipe[]>({
    queryKey: ["recipes", userId, page, pageSize],
    queryFn: () => getRecipes({ userId, page, pageSize }),
    enabled: !!userId,
    staleTime: 60000, // Data stays fresh for 1 minute
  });

  return {
    isLoading,
    recipes,
    error,
  };
}
