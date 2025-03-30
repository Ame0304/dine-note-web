import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import Heading from "@/components/Heading";
import {
  ChevronRightIcon,
  FireIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import Widget from "@/components/dashboard/Widget";
import Stat from "@/components/dashboard/Stat";
import Tag from "@/components/Tag";
import TagList from "@/components/recipe/TagList";
// import { ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div className="mt-4">
      {/* Welcome Message */}
      <Heading level="h1" className="mb-4">
        Welcome back, {user?.user_metadata.full_name}👏
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Left Container: Analytics (2/3 width) */}
        <div className="col-span-9 lg:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-6">
          <Widget size="small">
            <Stat
              title="Total Recipes"
              Icon={LightBulbIcon}
              value="24"
              color="purple"
            />
          </Widget>
          <Widget size="small">
            <Stat
              title="Recipes Tried"
              Icon={PuzzlePieceIcon}
              value="50%"
              color="yellow"
            />
          </Widget>
          <Widget size="small">
            <Stat title="Streak" Icon={FireIcon} value="5 days" color="red" />
          </Widget>

          <Widget size="medium">
            <Heading level="h4" styled={true}>
              Recent Recipes
            </Heading>
            <ul className="space-y-2">
              <li className="border-b py-2 flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src="/default-recipe.png"
                    alt="recipe image of ${title}"
                    width={50}
                    height={50}
                    className="w-16 h-16 rounded-full inline-block"
                  />
                  {/* Recipe Title and Tags */}
                  <div className="flex flex-col items-start">
                    <p className="text-md font-semibold">Spicy Tofu Stir Fry</p>
                    <div className="max-w-[200px]">
                      <TagList>
                        <Tag color="yellow" size="small">
                          Dinner
                        </Tag>
                        <Tag color="blue" size="small">
                          Asian
                        </Tag>
                        <Tag color="red" size="small">
                          Quick
                        </Tag>
                      </TagList>
                    </div>
                  </div>
                </div>
                <Link
                  href="/" // TODO:Replace with the actual recipe link
                  className="border-2 border-accent-500/80 text-accent-500 rounded-xl p-0.5"
                >
                  <ChevronRightIcon className="size-5" />
                </Link>
              </li>
            </ul>
          </Widget>
          <Widget size="medium">
            {/* <ResponsiveContainer width="100%" height={200}> */}
            {/* Insert Pie Chart Here */}
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              Recipe Categories - Pie Chart
            </div>
            {/* </ResponsiveContainer> */}
          </Widget>

          <Widget size="medium">
            {/* <ResponsiveContainer width="100%" height={200}> */}
            {/* Insert Bar Chart Here */}
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              Tried vs. Untried Recipes - Bar Chart
            </div>
            {/* </ResponsiveContainer> */}
          </Widget>

          <Widget size="large">
            {/* <ResponsiveContainer width="100%" height={200}> */}
            {/* Insert Line Chart Here */}
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
