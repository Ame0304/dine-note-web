import { PlanRecipe } from "@/lib/services/mealPlanService";
import { differenceInCalendarDays, parseISO, isToday } from "date-fns";

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

/*
 * Calculates the longest and current streak of cooked meals
 * @param cookedDateStrings Array of date strings representing cooked dates
 * @returns Object containing the longest and current streaks
 */

export function calculateStreaks(cookedDateStrings: string[]) {
  // 1. Sort the dates
  const dates = cookedDateStrings
    .map((d) => parseISO(d))
    .sort((a, b) => a.getTime() - b.getTime());

  // 2. Calculate longest streak
  let longest = 0;
  let current = 0;
  let tempStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = differenceInCalendarDays(dates[i], dates[i - 1]);
    if (diff === 1) {
      tempStreak++;
    } else if (diff > 1) {
      // Reset streak if there's a gap
      longest = Math.max(longest, tempStreak);
      tempStreak = 1;
    }
  }

  longest = Math.max(longest, tempStreak);

  // Current streak: the number of consecutive past days up to today where the user has cooked without skipping a day.

  for (let i = dates.length - 1; i >= 0; i--) {
    //If latestCookedDate is today, we check streak ending today.
    // If not, we still check how many consecutive past days up to that day were cooked.
    const latestCookedDate = isToday(dates[dates.length - 1])
      ? new Date()
      : dates[dates.length - 1];
    const currentDate = dates[i];

    const diff = differenceInCalendarDays(latestCookedDate, currentDate);
    if (diff === current) {
      current++;
    } else break;
  }

  return { longest, current };
}
