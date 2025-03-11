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

  // Search
  const searchTerm = router.query.search
    ? String(router.query.search)
    : undefined;

  // Filter
  const filter = router.query.filter ? String(router.query.filter) : undefined;

  // Sort
  let sort: { field: string; direction: string } | undefined;
  if (router.query.sortBy) {
    const sortByRaw = String(router.query.sortBy);
    const [field, direction] = sortByRaw.split("-");
    sort = { field, direction };
  }

  // Pagination
  const currentPage = Number(router.query.page) || 1;

  const { isLoading, data, error } = useQuery<RecipesResponse>({
    queryKey: [
      "recipes",
      userId,
      currentPage,
      PAGE_SIZE,
      sort,
      filter,
      searchTerm,
    ],
    queryFn: () =>
      getRecipes({ userId, page: currentPage, sort, filter, searchTerm }),
    enabled: !!userId,
    staleTime: 60000, // Data stays fresh for 1 minute
  });

  // TODO: Prefetch the next page

  return {
    isLoading,
    recipes: data?.recipes || [],
    error,
    count: data?.count || 0,
  };
}
