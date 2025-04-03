/*TODO:
1. Show a small label next to each meal in the selection list to indicate if it's already planned for the day. 
2. If a meal is already added, replace the + button with a different indicator (e.g., ✔️ or disable it).
3. Consider a search/filter bar if the list gets long. */

import PlanRecipeItem from "@/components/meal-plans/PlanRecipeItem";

export default function MealSelectionList() {
  const recipe = {
    id: "1",
    title: "Spaghetti Bolognese",
    imageUrl: "/default-recipe.png",
    categories: [
      { id: "1", name: "Italian", color: "red" },
      { id: "2", name: "Pasta", color: "blue" },
    ],
  };
  return (
    <div className="flex flex-col gap-4 overflow-y-auto flex-grow scrollbar-hide">
      <PlanRecipeItem recipe={recipe} />
      <PlanRecipeItem recipe={recipe} />
      <PlanRecipeItem recipe={recipe} />
      <PlanRecipeItem recipe={recipe} />
      <PlanRecipeItem recipe={recipe} />
    </div>
  );
}
