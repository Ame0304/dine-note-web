import Heading from "@/components/Heading";
import Calendar from "@/components/meal-plans/Calendar";
import TodayPlan from "@/components/meal-plans/TodayPlan";
import PlanRecipeItem from "@/components/meal-plans/PlanRecipeItem";

export default function MealPlansPage() {
  const recipe = {
    id: "1",
    title: "Spaghetti Bolognese",
    imageUrl: "/default-recipe.png",
  };
  return (
    <div className="px-4">
      <Heading level="h1" className="mb-4">
        What&apos;s to eat this week?
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Left Container: Calendar & recipes list (2/3 width) */}
        <div className="col-span-9 lg:col-span-6 flex flex-col gap-4">
          <Calendar />

          <div className="flex items-center gap-4">
            <Heading level="h3" className="mt-4 mb-2">
              Select a meal for
            </Heading>

            <select className="px-3 py-1.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-md shadow-accent-500 text-accent-500">
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          {/* Recipes List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto h-96">
            <PlanRecipeItem recipe={recipe} size="large" hasButton={true} />
            <PlanRecipeItem recipe={recipe} size="large" hasButton={true} />
            <PlanRecipeItem recipe={recipe} size="large" hasButton={true} />
          </div>
        </div>
        {/* Right Container: Today's Plan (1/3 width) */}
        <div className="flex flex-col gap-4 col-span-3">
          <div className="flex flex-col items-start justify-between">
            <Heading level="h2" styled={true}>
              Today&apos;s plan
            </Heading>
            <span className="text-accent-200/50 font-medium">
              Wed 2025/04/02
            </span>
          </div>
          <TodayPlan />
        </div>
      </div>
    </div>
  );
}
