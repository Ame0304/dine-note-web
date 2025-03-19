import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "@/lib/services/recipeService";
import { UpdateRecipeParams } from "@/lib/services/recipeService";
import { toast } from "react-hot-toast";

export default function useUpdateRecipeDetails() {
  const queryClient = useQueryClient();
  const { mutate: updateRecipeDetails, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, title, description, note }: UpdateRecipeParams) =>
      updateRecipe({ id, title, description, note }),
    onSuccess: (data, variables) => {
      toast.success(`Updated recipe "${variables.title}" successfully!`, {
        duration: 3000,
      });

      queryClient.invalidateQueries({
        queryKey: ["recipe", variables.id],
      });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });

  return { updateRecipeDetails, isUpdating };
}
