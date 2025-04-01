import { createClient } from "@/lib/supabase/server-props";
import {
  fetchDashboardData,
  RecentRecipe,
} from "@/lib/services/dashboardService";
import { AnalyticsData } from "@/lib/services/dashboardService";
import { GetServerSidePropsContext } from "next";

import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

import {
  FireIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import Stat from "@/components/dashboard/Stat";
import RecipeItem from "@/components/dashboard/RecipeItem";

const tailwindColorMap = {
  red: "rgb(246, 160, 160)",
  blue: "rgb(140, 189, 248)",
  green: "rgb(74, 222, 128)",
  yellow: "rgb(239, 217, 119)",
  purple: "rgb(216, 183, 250)",
  pink: "rgb(244, 176, 211)",
  indigo: "rgb(129, 140, 248)",
  orange: "rgb(248, 174, 113)",
  teal: "rgb(144, 245, 232)",
  gray: "rgb(156, 163, 175)",
};

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
  console.log(recentRecipes, "recentRecipes");
  console.log(categoryChart, "categoryChart");

  return (
    <div>
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

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={triedVsUntriedData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {triedVsUntriedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#71d7ff" : "#91f8b1"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} recipes`, `${name}`]}
                  contentStyle={{
                    backgroundColor: "#fff4e5",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 6px #fcdab8",
                    padding: "10px 14px",
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </Widget>

          {/* Category Chart */}
          <Widget size="large">
            <Heading level="h4" styled={true}>
              Recipe Categories
            </Heading>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryChart}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {categoryChart.map((entry, index) => {
                    const fillColor =
                      tailwindColorMap[
                        entry.color as keyof typeof tailwindColorMap
                      ] || entry.color;
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} recipes`, `${name}`]}
                  contentStyle={{
                    backgroundColor: "#fff4e5",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 6px #fcdab8",
                    padding: "10px 14px",
                    color: "#565656",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    right: 0,
                    width: "40%",
                    fontSize: "14px",
                    lineHeight: "1.4em",
                  }}
                  formatter={(value, entry, index) => {
                    // Format the legend label to include the count
                    const item = categoryChart[index];
                    return (
                      <span>
                        {value} -<span> {item.count}</span>
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
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
        </div>
      </div>
    </div>
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
