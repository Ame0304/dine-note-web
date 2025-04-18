import { createClient } from "@/lib/supabase/server-props";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import { subMonths } from "date-fns";
import {
  fetchDashboardRecipeData,
  RecentRecipe,
  getStreaks,
  getMealPlanTrend,
  MealPlanTrendData,
  getWeekIngredients,
} from "@/lib/services/dashboardService";
import { AnalyticsData } from "@/lib/services/dashboardService";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { getMealPlans } from "@/lib/services/mealPlanService";
import { PlanRecipe } from "@/lib/services/mealPlanService";

import {
  ChevronDoubleRightIcon,
  FireIcon,
  LightBulbIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import Stat from "@/components/dashboard/Stat";
import DashboardRecipeItem from "@/components/dashboard/DashboardRecipeItem";
import TriedChart from "@/components/dashboard/TriedChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import DashboardMealBox from "@/components/dashboard/DashboardMealBox";
import IngredientChecklist from "@/components/dashboard/IngredientChecklist";

interface DashboardPageProps {
  userName: string;
  userId: string;
  initalAnalytics: AnalyticsData;
  todayMeals: {
    mealPlanId: string;
    meals: {
      id: string;
      recipe: PlanRecipe;
      meal_type: string;
      completed: boolean;
    }[];
  };
  streaks: { longest: number; current: number };
  mealPlanTrend: MealPlanTrendData[];
  weekIngredients: string[];
}

export default function DashboardPage({
  userName,
  initalAnalytics,
  todayMeals,
  streaks,
  mealPlanTrend,
  weekIngredients,
}: DashboardPageProps) {
  const {
    totalRecipes,
    triedRecipesPercentage,
    triedVsUntriedData,
    recentRecipes,
    categoryChart,
  } = initalAnalytics;

  const today = new Date();
  const startDate = subMonths(today, 3);

  return (
    <>
      {/* Welcome Message */}
      <Heading level="h1" className="mb-4">
        Welcome back, {userName}👏
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Left Container: Analytics (2/3 width) */}
        <div className="col-span-9 lg:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Recipe Stats */}
          <Widget size="small">
            <Stat title="Total Recipes" value={totalRecipes} color="purple">
              <LightBulbIcon className="w-8 h-8 text-purple-500" />
            </Stat>
          </Widget>
          <Widget size="small">
            <Stat
              title="Longest Streak"
              value={`${streaks.longest} days`}
              color="yellow"
            >
              <TrophyIcon className="w-8 h-8 text-yellow-500" />
            </Stat>
          </Widget>
          <Widget size="small">
            <Stat
              title="Current Streak"
              value={`${streaks.current} days`}
              color="red"
            >
              <FireIcon className="w-8 h-8 text-red-500" />
            </Stat>
          </Widget>

          {/* Recent Recipes */}
          <Widget size="medium">
            <Heading level="h4" styled="bg-accent-500">
              ☀️ Recent Recipes
            </Heading>
            <ul className="space-y-2">
              {recentRecipes.map((recipe: RecentRecipe) => (
                <DashboardRecipeItem key={recipe.id} recipe={recipe} />
              ))}
            </ul>
          </Widget>

          {/* Tried vs Untried Pie Chart */}
          <Widget size="medium">
            <div className="flex flex-wrap justify-between items-center">
              <Heading level="h4" styled="bg-accent-300">
                👍 Tried vs Untried Recipes
              </Heading>
              <span className="text-3xl text-accent-300 font-semibold">
                {triedRecipesPercentage}%
              </span>
            </div>
            <TriedChart data={triedVsUntriedData} />
          </Widget>

          {/* Category Chart */}
          <Widget size="large">
            <Heading level="h4" styled="bg-accent-400">
              📊 Recipe Categories
            </Heading>
            <CategoryChart data={categoryChart} />
          </Widget>
        </div>

        {/* Right Container: Meal Plan (1/3 width) */}
        <div className="flex flex-col gap-4 grid-cols-1  col-span-9 lg:col-span-3 ">
          {/*Cooking HeatMap */}
          <Widget size="medium">
            <Heading level="h4" styled="bg-accent-500">
              🗺️ Cooking HeatMap
            </Heading>

            <CalendarHeatmap
              startDate={startDate}
              endDate={today}
              values={mealPlanTrend}
              classForValue={(value) => {
                if (!value || value.count === 0) {
                  return "color-empty";
                }
                if (value.count > 3) return "color-scale-4";
                return `color-scale-${value.count}`;
              }}
              tooltipDataAttrs={(value) => {
                return {
                  "data-tooltip-id": "calendar-tooltip",
                  "data-tooltip-content": value?.date
                    ? `${value.date}: ${value.count ?? 0} meal${
                        (value.count ?? 0) > 1 ? "s" : ""
                      } planned`
                    : "No meals planned",
                } as React.HTMLAttributes<SVGElement>;
              }}
            />
            <Tooltip id="calendar-tooltip" place="top" />
          </Widget>

          <Widget size="medium">
            <div className="flex justify-between items-center mb-2">
              <Heading level="h4" styled="bg-accent-300">
                🥘 Today&apos;s Meals
              </Heading>
              <Link
                href="/meal-plans"
                className="text-sm hover:text-accent-500 font-semibold"
              >
                {todayMeals.meals.length !== 0
                  ? "View all meals"
                  : "Plan your meals"}
                <ChevronDoubleRightIcon className="w-4 h-4 inline stroke-2" />
              </Link>
            </div>

            {todayMeals.meals && <DashboardMealBox todayMeals={todayMeals} />}
          </Widget>

          <Widget size="medium">
            <Heading level="h4" styled="bg-accent-400">
              🛒 Week&apos;s Shopping list
            </Heading>
            {weekIngredients ? (
              <IngredientChecklist ingredients={weekIngredients} />
            ) : (
              <div>
                <p>No ingredients yet</p>
              </div>
            )}
          </Widget>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userName = data?.user.user_metadata.full_name;
  const userId = data?.user.id;
  const today = new Date();
  const formattedDate = format(new Date(today), "yyyy-MM-dd");

  try {
    const [
      initalAnalytics,
      todayMeals,
      streaks,
      mealPlanTrend,
      weekIngredients,
    ] = await Promise.all([
      fetchDashboardRecipeData(userId, supabase),
      getMealPlans(userId, formattedDate, supabase),
      getStreaks(userId, supabase),
      getMealPlanTrend(userId, supabase),
      getWeekIngredients(userId, today, supabase),
    ]);

    return {
      props: {
        userName,
        initalAnalytics,
        todayMeals,
        streaks,
        mealPlanTrend,
        weekIngredients,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      props: {
        userName,
        initalAnalytics: null,
        todayMeals: null,
        streaks: null,
        mealPlanTrend: null,
        weekIngredients: null,
        error: "Failed to fetch dashboard data",
      },
    };
  }
}
