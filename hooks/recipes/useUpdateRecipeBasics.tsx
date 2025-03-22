import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "@/lib/services/recipeService";
import { toast } from "react-hot-toast";

interface RecipeBasics {
  id: string;
  title: string;
  description: string;
  note: string;
  imageUrl: string;
  imageFile?: File | null;
  userId: string;
}

export default function useUpdateRecipeBasics() {
  const queryClient = useQueryClient();
  const { mutate: updateRecipeBasics, isPending: isUpdating } = useMutation({
    mutationFn: (data: RecipeBasics) => updateRecipe(data),
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

  return { updateRecipeBasics, isUpdating };
}
