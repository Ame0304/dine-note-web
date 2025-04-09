import { useState } from "react";
import { useUser } from "@/context/UserContext";

import Heading from "@/components/Heading";
import Calendar from "@/components/meal-plans/Calendar";
import useAddMealToPlan from "@/hooks/meal-plans/useAddMealToPlan";
import useMealPlans from "@/hooks/meal-plans/useMealPlans";
import MealSelectionBox from "@/components/meal-plans/MealSelectionBox";
import DailyPlanBox from "@/components/meal-plans/DailyPlanBox";

export default function MealPlansPage() {
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

  return (
    <div className="px-4">
      <Heading level="h1" className="mb-4" styled="bg-accent-500">
        Meal Plans
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Left Container: Calendar & Daily Plan (2/3 width) */}
        <div className="col-span-9 lg:col-span-6 flex flex-col gap-4">
          <Calendar onSelect={handleDateSelect} selectedDate={selectedDate} />

          <DailyPlanBox
            onAdd={handleMealTypeChange}
            selectedDate={selectedDate}
            mealPlan={mealPlan || { mealPlanId: "", meals: [] }}
            selectedMealType={selectedMealType}
            isAdding={isAdding}
          />
        </div>

        {/* Right Container: Meal Selection Box (1/3 width) */}
        <MealSelectionBox
          userId={userId}
          selectedMealType={selectedMealType}
          plannedMealIds={plannedMealIds}
          onSelect={setSelectedMealType}
          isAdding={isAdding}
          handleAddMealToPlan={handleAddMealToPlan}
        />
      </div>
    </div>
  );
}
