import Widget from "@/components/dashboard/Widget";
import Heading from "@/components/Heading";
import DashboardMealBox from "@/components/dashboard/DashboardMealBox";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { MealPlanItem } from "@/lib/services/mealPlanService";

interface TodayMealsProps {
  todayMeals: {
    mealPlanId: string;
    meals: MealPlanItem[];
  } | null;
}

export default function TodayMeals({ todayMeals }: TodayMealsProps) {
  return (
    <Widget size="medium">
      <div className="flex justify-between items-center mb-2">
        <Heading level="h4" styled="bg-accent-300">
          🥘 Today&apos;s Meals
        </Heading>
        {todayMeals && todayMeals.meals.length !== 0 ? (
          <Link
            href="/meal-plans"
            className="text-sm text-primary-50 hover:text-accent-300 font-semibold"
          >
            View all meals
            <ChevronDoubleRightIcon className="w-4 h-4 inline stroke-2" />
          </Link>
        ) : null}
      </div>

      {todayMeals && <DashboardMealBox todayMeals={todayMeals} />}
    </Widget>
  );
}
