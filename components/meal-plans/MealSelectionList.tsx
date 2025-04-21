/*TODO:
1. A search/filter bar if the list gets long. */
import PlanRecipeItem from "@/components/meal-plans/PlanRecipeItem";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import usePlanRecipes from "@/hooks/meal-plans/usePlanRecipes";
import { PlanRecipe } from "@/lib/services/mealPlanService";

interface MealSelectionListProps {
  userId: string;
  onAddMeal: (recipeId: PlanRecipe) => void;
  isAdding: boolean;
  plannedMealIds?: string[];
}

export default function MealSelectionList({
  userId,
  onAddMeal,
  isAdding,
  plannedMealIds = [],
}: MealSelectionListProps) {
  const { recipes, isLoading, error } = usePlanRecipes(userId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col overflow-y-auto flex-grow scrollbar-hide">
      {error && <Error message="Error loading recipes" />}

      {recipes.map((recipe: PlanRecipe) => (
        <PlanRecipeItem
          key={recipe.id}
          recipe={recipe}
          onSelect={() => onAddMeal(recipe)}
          isAdding={isAdding}
          isAlreadyPlanned={plannedMealIds.includes(recipe.id)}
        />
      ))}
    </div>
  );
}
