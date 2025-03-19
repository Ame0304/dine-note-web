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

      const currentCache = queryClient.getQueryData(["recipes"]);
      console.log("Current recipes cache:", currentCache);

      // update the status in recipe detail page
      queryClient.invalidateQueries({
        queryKey: ["recipe", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });

      // // Update the recipes list without refetching
      // queryClient.setQueryData(
      //   ["recipes"],
      //   (oldData: { recipes: Recipe[]; count: number } | undefined) => {
      //     if (!oldData) return oldData;

      //     // Update the tried status in the recipes list
      //     return {
      //       ...oldData,
      //       recipes: oldData.recipes.map((recipe: Recipe) =>
      //         recipe.id === variables.id
      //           ? { ...recipe, tried: variables.tried }
      //           : recipe
      //       ),
      //     };
      //   }
      // );
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
