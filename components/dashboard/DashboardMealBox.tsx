import React from "react";
import { PlanRecipe } from "@/lib/services/mealPlanService";
import { getMealsByMealType } from "@/lib/helpers";
import BaseRecipeItem from "@/components/BaseRecipeItem";
import ViewLink from "../ViewLink";
import Link from "next/link";

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
      <div className="text-center py-4 text-primary-50 font-semibold">
        <p>No meals planned for today</p>
        <Link
          href="/meal-plans"
          className="text-primary-100 hover:text-accent-300 text-lg"
        >
          📆 Plan your meals
        </Link>
        <p>to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 h-[300px] overflow-y-auto scrollbar-hide flex flex-col justify-between">
      <div>
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
      <Link href={"/meal-plans"}>
        <div className="bg-accent-200/20 border-4 rounded-xl p-2 text-center border-dashed border-accent-200/50 cursor-pointer hover:text-primary-950">
          <span className="font-semibold ">Add more meals +</span>
        </div>
      </Link>
    </div>
  );
}
