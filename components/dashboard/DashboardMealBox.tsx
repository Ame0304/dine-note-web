import React from "react";
import { PlanRecipe } from "@/lib/services/mealPlanService";
import { getMealsByMealType } from "@/lib/helpers";
import BaseRecipeItem from "@/components/BaseRecipeItem";
import ViewLink from "../ViewLink";

interface DashboardMealBoxProps {
  todayMeals: {
    mealPlanId: string;
    meals: {
      id: string;
      recipe: PlanRecipe;
      meal_type: string;
      completed: boolean;
    }[];
  };
}

export default function DashboardMealBox({
  todayMeals,
}: DashboardMealBoxProps) {
  const meals = todayMeals?.meals || [];

  // Get meals for each type
  const mealsByType = {
    breakfast: getMealsByMealType(meals, "breakfast"),
    lunch: getMealsByMealType(meals, "lunch"),
    dinner: getMealsByMealType(meals, "dinner"),
    snack: getMealsByMealType(meals, "snack"),
  };

  // Meal type display config
  const mealTypes = [
    { id: "breakfast", label: "Breakfast", emoji: "🍳" },
    { id: "lunch", label: "Lunch", emoji: "🥗" },
    { id: "dinner", label: "Dinner", emoji: "🍲" },
    { id: "snack", label: "Snack", emoji: "🍇" },
  ];

  // Show only meal types that have meals
  const activeMealTypes = mealTypes.filter(
    (type) => mealsByType[type.id as keyof typeof mealsByType].length > 0
  );

  // If no meals for today
  if (activeMealTypes.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 font-semibold">
        <p>No meals planned for today</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activeMealTypes.map((type) => (
        <div key={type.id}>
          <div className="text-sm font-medium mb-1">
            {type.emoji} {type.label}
          </div>
          <ul className="space-y-2">
            {mealsByType[type.id as keyof typeof mealsByType].map((meal) => (
              <li key={meal.id}>
                <BaseRecipeItem
                  recipe={{
                    id: meal.recipe.id,
                    title: meal.recipe.title,
                    imageUrl: meal.recipe.imageUrl || "",
                    categories: meal.recipe.categories,
                  }}
                  rightElement={ViewLink(meal.recipe.id)}
                  maxTagWidth="max-w-[150px]"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
