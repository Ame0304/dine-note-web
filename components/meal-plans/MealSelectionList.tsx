/*TODO:
1. Show a small label next to each meal in the selection list to indicate if it's already planned for the day. 
2. If a meal is already added, replace the + button with a different indicator (e.g., ✔️ or disable it).
3. Consider a search/filter bar if the list gets long. */
import PlanRecipeItem from "@/components/meal-plans/PlanRecipeItem";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import usePlanRecipes from "@/hooks/meal-plans/usePlanRecipes";
import { PlanRecipe } from "@/lib/services/mealPlanService";

export default function MealSelectionList({ userId }: { userId: string }) {
  const { recipes, isLoading, error } = usePlanRecipes(userId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto flex-grow scrollbar-hide">
      {error && <Error message="Error loading recipes" />}

      {recipes.map((recipe: PlanRecipe) => (
        <PlanRecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
