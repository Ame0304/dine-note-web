import PlanBox from "./PlanBox";
import { PlanRecipe } from "@/lib/services/mealPlanService";
import { getMealsByMealType } from "@/lib/helpers";

interface TodayPlanProps {
  mealPlan: {
    mealPlanId: string;
    meals: {
      id: string;
      completed: boolean;
      recipe: PlanRecipe;
      meal_type: string;
    }[];
  };
  selectedMealType: string;
  onAdd: (mealType: string) => void;
  isAdding?: boolean;
  selectedDate: Date;
}

export default function TodayPlan({
  mealPlan,
  selectedMealType,
  onAdd,
  isAdding,
  selectedDate,
}: TodayPlanProps) {
  const meals = mealPlan?.meals;

  // Get recipes for each meal type
  const lunchMeals = getMealsByMealType(meals, "lunch") || [];
  const breakfastMeals = getMealsByMealType(meals, "breakfast") || [];
  const dinnerMeals = getMealsByMealType(meals, "dinner") || [];
  const snackMeals = getMealsByMealType(meals, "snack") || [];

  const planBoxes = [
    {
      type: "Breakfast",
      meals: breakfastMeals,
      selected: selectedMealType === "breakfast",
    },
    {
      type: "Lunch",
      meals: lunchMeals,
      selected: selectedMealType === "lunch",
    },
    {
      type: "Dinner",
      meals: dinnerMeals,
      selected: selectedMealType === "dinner",
    },
    {
      type: "Snack",
      meals: snackMeals,
      selected: selectedMealType === "snack",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {planBoxes.map((box) => (
        <PlanBox
          key={box.type}
          meals={box.meals}
          selected={box.selected}
          typeTitle={box.type}
          onAdd={onAdd}
          isAdding={isAdding}
          selectedDate={selectedDate}
        />
      ))}
    </div>
  );
}
