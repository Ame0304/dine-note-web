import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { toggleTried } from "@/lib/services/recipeService";
// import { Recipe } from "@/lib/services/recipeService";

export default function useToggleRecipeTried() {
  const queryClient = useQueryClient();
  const { mutate: toggleRecipeTried, isPending: isUpdating } = useMutation({
    mutationFn: ({ tried, id }: { tried: boolean; id: string }) => {
      return toggleTried({ tried, id });
    },
    onSuccess: (data, variables) => {
      toast.success(
        `Recipe marked as ${variables.tried ? "tried" : "not tried yet"}`,
        { duration: 4000 }
      );

      queryClient.invalidateQueries({
        queryKey: ["recipe", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
    onError: (error) => {
      toast.error("Failed to update recipe");
      console.error("Update recipe error:", error);
    },
  });

  return {
    isUpdating,
    toggleRecipeTried,
  };
}
