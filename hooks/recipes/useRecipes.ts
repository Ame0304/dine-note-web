import { useQuery } from "@tanstack/react-query";
import { getRecipes, Recipe } from "@/lib/services/recipeService";
import { PAGE_SIZE } from "@/lib/constants";
import { useRouter } from "next/router";

interface RecipesResponse {
  recipes: Recipe[];
  count: number | null;
}

export function useRecipes(userId: string | undefined) {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;

  const { isLoading, data, error } = useQuery<RecipesResponse>({
    queryKey: ["recipes", userId, currentPage, PAGE_SIZE],
    queryFn: () => getRecipes({ userId, page: currentPage }),
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
