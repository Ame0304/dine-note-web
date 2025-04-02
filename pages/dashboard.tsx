import { createClient } from "@/lib/supabase/server-props";
import {
  fetchDashboardData,
  RecentRecipe,
} from "@/lib/services/dashboardService";
import { AnalyticsData } from "@/lib/services/dashboardService";
import { GetServerSidePropsContext } from "next";

import {
  FireIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import Stat from "@/components/dashboard/Stat";
import RecipeItem from "@/components/dashboard/RecipeItem";
import TriedChart from "@/components/dashboard/TriedChart";
import CategoryChart from "@/components/dashboard/CategoryChart";

export default function DashboardPage({
  userName,
  initalAnalytics,
}: {
  userName: string;
  userId: string;
  initalAnalytics: AnalyticsData;
}) {
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
        <div className="col-span-9 lg:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Recipe Stats */}
          <Widget size="small">
            <Stat title="Total Recipes" value={totalRecipes} color="purple">
              <LightBulbIcon className="w-8 h-8 text-purple-500" />
            </Stat>
          </Widget>
          <Widget size="small">
            <Stat
              title="Recipes Tried"
              value={`${triedRecipesPercentage}%`}
              color="yellow"
            >
              <PuzzlePieceIcon className="w-8 h-8 text-yellow-500" />
            </Stat>
          </Widget>
          <Widget size="small">
            <Stat title="Streak" value="5 days" color="red">
              <FireIcon className="w-8 h-8 text-red-500" />
            </Stat>
          </Widget>

          {/* Recent Recipes */}
          <Widget size="medium">
            <Heading level="h4" styled={true}>
              Recent Recipes
            </Heading>
            <ul className="space-y-2">
              {recentRecipes.map((recipe: RecentRecipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
              ))}
            </ul>
          </Widget>

          {/* Tried vs Untried Pie Chart */}
          <Widget size="medium">
            <Heading level="h4" styled={true}>
              Recipe Progress
            </Heading>
            <TriedChart data={triedVsUntriedData} />
          </Widget>

          {/* Category Chart */}
          <Widget size="large">
            <Heading level="h4" styled={true}>
              Recipe Categories
            </Heading>
            <CategoryChart data={categoryChart} />
          </Widget>

          <Widget size="large">
            {/* <ResponsiveContainer width="100%" height={200}> */}
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              Cooking Trends
            </div>
            {/* </ResponsiveContainer> */}
          </Widget>
        </div>

        {/* Right Container: Meal Plan (1/3 width) */}
        <div className="flex flex-col gap-4 col-span-3">
          <Widget size="medium">
            <p>Today&apos;s Meals:</p>
            <ul className="mt-2 space-y-2">
              <li className="border-b py-2">🍲 Miso Soup</li>
              <li className="border-b py-2">🥗 Avocado Salad</li>
            </ul>
          </Widget>

          <Widget size="medium">
            <p>Today&apos;s Shopping list</p>
            <ul className="mt-2 space-y-2">
              <li className="border-b py-2">🥔 Potato</li>
              <li className="border-b py-2">🥑 Avocado </li>
            </ul>
          </Widget>

          <p>
            1. Today’s Meals 🍽️ (List of today’s planned meals) Meal Plan 2.
            Completion Rate ✅ (How many planned meals were completed this week)
            3. Most Planned Recipe 🏆 (The most frequently added recipe to meal
            plans)
          </p>
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

  try {
    const initalAnalytics = await fetchDashboardData(userId, supabase);

    return {
      props: {
        userName,
        initalAnalytics,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      props: {
        userName,
        initalAnalytics: null,
        error: "Failed to fetch dashboard data",
      },
    };
  }
}
