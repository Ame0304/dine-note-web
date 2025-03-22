import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipeIngredients } from "@/lib/services/recipeService";
import { toast } from "react-hot-toast";
import { Ingredient } from "@/components/IngredientsManager";

interface UpdateIngredientsData {
  id: string;
  ingredients: Ingredient[];
}

export default function useUpdateRecipeIngredients() {
  const queryClient = useQueryClient();

  const { mutate: updateIngredients, isPending: isUpdating } = useMutation({
    mutationFn: (data: UpdateIngredientsData) => updateRecipeIngredients(data),
    onSuccess: (_, variables) => {
      toast.success("Updated ingredients successfully!", {
        duration: 3000,
      });

      queryClient.invalidateQueries({
        queryKey: ["recipe", variables.id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });

  return { updateIngredients, isUpdating };
}
