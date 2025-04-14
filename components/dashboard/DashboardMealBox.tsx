import React from "react";
import { PlanRecipe } from "@/lib/services/mealPlanService";
import BaseRecipeItem from "@/components/BaseRecipeItem";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

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

  // Helper function to filter meals by type
  const getMealsByMealType = (mealType: string) => {
    return meals
      .filter((meal) => meal.meal_type === mealType)
      .map((meal) => ({
        id: meal.id,
        completed: meal.completed,
        recipe: meal.recipe,
      }));
  };

  // Get meals for each type
  const mealsByType = {
    breakfast: getMealsByMealType("breakfast"),
    lunch: getMealsByMealType("lunch"),
    dinner: getMealsByMealType("dinner"),
    snack: getMealsByMealType("snack"),
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
      <div className="text-center py-4 text-gray-500">
        <p>No meals planned for today</p>
        <Link
          href="/meal-plans"
          className="mt-2 inline-block text-accent-600 hover:text-accent-800 text-sm"
        >
          Plan your meals →
        </Link>
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
            {mealsByType[type.id as keyof typeof mealsByType].map((meal) => {
              const viewLink = (
                <Link
                  href={`/recipes/${meal.recipe.id}`}
                  className="border-2 border-accent-500/80 text-accent-500 hover:bg-accent-500 hover:text-primary-950 rounded-xl p-0.5"
                >
                  <ChevronRightIcon className="size-5 stroke-[3]" />
                </Link>
              );

              return (
                <li key={meal.id}>
                  <BaseRecipeItem
                    recipe={{
                      id: meal.recipe.id,
                      title: meal.recipe.title,
                      imageUrl: meal.recipe.imageUrl || "",
                      categories: meal.recipe.categories,
                    }}
                    rightElement={viewLink}
                    maxTagWidth="max-w-[150px]"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
