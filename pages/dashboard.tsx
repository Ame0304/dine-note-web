import { createClient } from "@/lib/supabase/server-props";
import "react-calendar-heatmap/dist/styles.css";
import {
  fetchDashboardRecipeData,
  getStreaks,
  getMealPlanTrend,
  MealPlanTrendData,
  getWeekIngredients,
} from "@/lib/services/dashboardService";
import { AnalyticsData } from "@/lib/services/dashboardService";
import { GetServerSidePropsContext } from "next";
import { format } from "date-fns";
import { getMealPlans } from "@/lib/services/mealPlanService";
import { PlanRecipe } from "@/lib/services/mealPlanService";

import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import CategoryChart from "@/components/dashboard/CategoryChart";

import Stats from "@/components/dashboard/Stats";
import RecentRecipes from "@/components/dashboard/RecentRecipes";
import TriedPieChart from "@/components/dashboard/TriedPieChart";
import CookingHeatmap from "@/components/dashboard/CookingHeatmap";
import TodayMeals from "@/components/dashboard/TodayMeals";
import WeekShoppingList from "@/components/dashboard/WeekShoppingList";

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
          <Stats totalRecipes={totalRecipes} streaks={streaks} />

          {/* Recent Recipes */}
          <RecentRecipes recentRecipes={recentRecipes} />

          {/* Today's Meals */}
          <TodayMeals todayMeals={todayMeals} />

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
          <CookingHeatmap mealPlanTrend={mealPlanTrend} />

          {/* Tried vs Untried Pie Chart */}
          <TriedPieChart
            triedRecipesPercentage={triedRecipesPercentage}
            triedVsUntriedData={triedVsUntriedData}
          />
          {/*Week's ingredient shopping list */}
          <WeekShoppingList weekIngredients={weekIngredients} />
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
