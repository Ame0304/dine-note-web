import { useState } from "react";
import { useUser } from "@/context/UserContext";

import Heading from "@/components/Heading";
import Calendar from "@/components/meal-plans/Calendar";
import TodayPlan from "@/components/meal-plans/TodayPlan";
import MealSelectionList from "@/components/meal-plans/MealSelectionList";
import useAddMealToPlan from "@/hooks/meal-plans/useAddMealToPlan";
import useMealPlans from "@/hooks/meal-plans/useMealPlans";

export default function MealPlansPage() {
  // TODO: add subtle highlight on the selected meal type box
  const { user } = useUser();
  const userId = user?.id || "";

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMealType, setSelectedMealType] = useState("breakfast");
  const { isAdding, addMealToPlan } = useAddMealToPlan();

  // Fetch the meal plan for the selected date
  const { mealPlan } = useMealPlans(userId, selectedDate);

  // Get the IDs of the planned meals for the selected date
  const plannedMealIds = mealPlan?.meals.map((meal) => meal.recipe.id) || [];

  function handleMealTypeChange(mealType: string) {
    setSelectedMealType(mealType);
  }

  function handleAddMealToPlan(recipeId: string) {
    if (!userId) return;

    const data = {
      userId,
      date: selectedDate.toISOString().split("T")[0],
      mealType: selectedMealType,
      recipeId,
    };

    addMealToPlan(data);
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
  }

  // Format the selected date to display
  const formattedDate = selectedDate
    .toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$1/$2");

  const today = new Date();

  return (
    <div className="px-4">
      <Heading level="h1" className="mb-4" styled="bg-accent-500">
        Meal Plans
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Left Container: Calendar & recipes list (2/3 width) */}
        <div className="col-span-9 lg:col-span-6 flex flex-col gap-4">
          <Calendar onSelect={handleDateSelect} selectedDate={selectedDate} />
          <div className="flex flex-col items-start justify-between">
            <Heading level="h2" styled="bg-accent-400">
              {selectedDate.toDateString() === today.toDateString()
                ? "Today's Plan"
                : "Meal Plan for"}
            </Heading>
            <span className="text-accent-200/50 font-medium">
              {formattedDate}
            </span>
          </div>

          <TodayPlan
            mealPlan={mealPlan || { mealPlanId: "", meals: [] }}
            selectedMealType={selectedMealType}
            onAdd={handleMealTypeChange}
            isAdding={isAdding}
          />
        </div>

        {/* Right Container: Today's Plan (1/3 width) */}
        <div className="flex flex-col gap-4 col-span-9 lg:col-span-3 shadow-lg shadow-primary-900 rounded-xl bg-white/80 p-4 h-1/3 lg:h-[calc(100vh-150px)]">
          <div className="flex flex-col items-center gap-3">
            <Heading level="h3" className="my-2">
              Select a meal for
            </Heading>

            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
              disabled={isAdding}
              className="px-3 py-1.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-md shadow-accent-500 text-accent-500 font-medium"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          {/* Meal Selection List */}
          <MealSelectionList
            userId={userId}
            onAddMeal={handleAddMealToPlan}
            isAdding={isAdding}
            plannedMealIds={plannedMealIds}
          />
        </div>
      </div>
    </div>
  );
}
