import { createClient } from "@/lib/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import "react-calendar-heatmap/dist/styles.css";
import {
  fetchDashboardRecipeData,
  getStreaks,
  getMealPlanTrend,
  MealPlanTrendData,
  getWeekIngredients,
} from "@/lib/services/dashboardService";
import { AnalyticsData } from "@/lib/services/dashboardService";
import { format } from "date-fns";
import { getMealPlans, MealPlanItem } from "@/lib/services/mealPlanService";

import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import CategoryChart from "@/components/dashboard/CategoryChart";

import Stats from "@/components/dashboard/Stats";
import RecentRecipes from "@/components/dashboard/RecentRecipes";
import TriedPieChart from "@/components/dashboard/TriedPieChart";
import CookingHeatmap from "@/components/dashboard/CookingHeatmap";
import TodayMeals from "@/components/dashboard/TodayMeals";
import WeekShoppingList from "@/components/dashboard/WeekShoppingList";
import Error from "@/components/Error";

interface DashboardPageProps {
  userName: string;
  userId: string;
  initalAnalytics: AnalyticsData | null;
  todayMeals: {
    mealPlanId: string;
    meals: MealPlanItem[];
  } | null;
  streaks: { longest: number; current: number };
  mealPlanTrend: MealPlanTrendData[];
  weekIngredients: string[];
  error: string | null;
}

export default function DashboardPage({
  userName,
  initalAnalytics,
  todayMeals,
  streaks,
  mealPlanTrend,
  weekIngredients,
  error,
}: DashboardPageProps) {
  if (error) {
    return <Error message={error} />;
  }

  const {
    totalRecipes,
    triedRecipesPercentage,
    triedVsUntriedData,
    recentRecipes,
    categoryChart,
  } = initalAnalytics || {
    totalRecipes: "0",
    triedRecipesPercentage: 0,
    triedVsUntriedData: [],
    recentRecipes: [],
    categoryChart: [],
  };

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
  // Authentication check
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.error("Error fetching user:", userError);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userName = userData?.user.user_metadata.full_name;
  const userId = userData?.user.id;
  const today = new Date();
  const formattedDate = format(new Date(today), "yyyy-MM-dd");

  let initalAnalytics: AnalyticsData | null = null;
  let todayMeals: {
    mealPlanId: string;
    meals: MealPlanItem[];
  } | null = null;
  let streaks: { longest: number; current: number } = {
    longest: 0,
    current: 0,
  };
  let mealPlanTrend: MealPlanTrendData[] = [];
  let weekIngredients: string[] = [];
  let pageError: string | null = null;

  const [
    analyticsResult,
    mealsResult,
    streaksResult,
    trendResult,
    ingredientsResult,
  ] = await Promise.allSettled([
    fetchDashboardRecipeData(userId, supabase),
    getMealPlans(userId, formattedDate, supabase),
    getStreaks(userId, supabase),
    getMealPlanTrend(userId, supabase),
    getWeekIngredients(userId, today, supabase),
  ]);

  // Handle critical analytics data
  if (analyticsResult.status === "fulfilled") {
    initalAnalytics = analyticsResult.value;
  } else {
    console.error(
      "Failed to fetch dashboard recipe data:",
      analyticsResult.reason
    );
    pageError = "Failed to load essential recipe data.";
    // initalAnalytics remains null
  }

  // Assign values for others if fulfilled, otherwise rely on initialized defaults
  if (mealsResult.status === "fulfilled") {
    todayMeals = mealsResult.value;
  } else {
    console.error("Failed to fetch today's meals:", mealsResult.reason);
  }

  if (streaksResult.status === "fulfilled") {
    streaks = streaksResult.value;
  }

  if (trendResult.status === "fulfilled") {
    mealPlanTrend = trendResult.value;
  }

  if (ingredientsResult.status === "fulfilled") {
    weekIngredients = ingredientsResult.value;
  }

  return {
    props: {
      userName,
      initalAnalytics,
      todayMeals,
      streaks,
      mealPlanTrend,
      weekIngredients,
      error: pageError,
    },
  };
}
