import { PlanRecipe } from "@/lib/services/mealPlanService";

export interface MealItem {
  id: string;
  completed: boolean;
  recipe: PlanRecipe;
  meal_type: string;
}

/**
 * Filters meals by specified meal type
 * @param meals Array of meal items
 * @param mealType Type of meal to filter ("breakfast", "lunch", "dinner", "snack")
 * @returns Filtered array of meals
 */
export function getMealsByMealType(
  meals: MealItem[] | undefined,
  mealType: string
) {
  if (!meals || meals.length === 0) {
    return [];
  }

  const mealsOfThisType = meals.filter((meal) => meal.meal_type === mealType);

  return mealsOfThisType.map((meal) => ({
    id: meal.id,
    completed: meal.completed,
    recipe: {
      id: meal.recipe.id,
      title: meal.recipe.title,
      imageUrl: meal.recipe.imageUrl,
      categories: meal.recipe.categories,
    },
  }));
}

/**
 * Common meal types with display information
 */
export const mealTypes = [
  { id: "breakfast", label: "Breakfast", emoji: "🍳" },
  { id: "lunch", label: "Lunch", emoji: "🥗" },
  { id: "dinner", label: "Dinner", emoji: "🍲" },
  { id: "snack", label: "Snack", emoji: "🍇" },
];
