import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/services/categoryService";
import { Category } from "@/lib/services/categoryService";

export function useCategories(userId: string | undefined) {
  const { data, error } = useQuery<Category[]>({
    queryKey: ["categories", userId],
    queryFn: () => getCategories(userId),
    staleTime: 600000,
  });

  return {
    categories: data || [],
    error,
  };
}
