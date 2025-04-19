import Widget from "@/components/dashboard/Widget";
import Heading from "@/components/Heading";
import DashboardMealBox from "@/components/dashboard/DashboardMealBox";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { PlanRecipe } from "@/lib/services/mealPlanService";

interface TodayMealsProps {
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

export default function TodayMeals({ todayMeals }: TodayMealsProps) {
  return (
    <Widget size="medium">
      <div className="flex justify-between items-center mb-2">
        <Heading level="h4" styled="bg-accent-300">
          🥘 Today&apos;s Meals
        </Heading>
        <Link
          href="/meal-plans"
          className="text-sm text-primary-50 hover:text-accent-500 font-semibold"
        >
          {todayMeals.meals.length !== 0 ? "View all meals" : "Plan your meals"}
          <ChevronDoubleRightIcon className="w-4 h-4 inline stroke-2" />
        </Link>
      </div>

      {todayMeals.meals && <DashboardMealBox todayMeals={todayMeals} />}
    </Widget>
  );
}
