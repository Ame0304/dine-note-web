import { PlanRecipe } from "@/lib/services/mealPlanService";
import Heading from "../Heading";
import MealSelectionList from "./MealSelectionList";

interface MealSelectionBoxProps {
  userId: string;
  selectedMealType: string;
  onSelect: (mealType: string) => void;
  isAdding: boolean;
  plannedMealIds: string[];
  handleAddMealToPlan: (recipe: PlanRecipe) => void;
}

export default function MealSelectionBox({
  userId,
  selectedMealType,
  onSelect,
  isAdding,
  plannedMealIds,
  handleAddMealToPlan,
}: MealSelectionBoxProps) {
  return (
    <div className="flex flex-col gap-3 col-span-9 lg:col-span-3 shadow-lg shadow-primary-900 rounded-xl bg-white/50 p-4 h-1/3 lg:h-[calc(100vh-150px)]">
      <div className="flex flex-col items-center gap-3">
        <Heading level="h3" className="my-2">
          Select a meal for
        </Heading>

        <select
          value={selectedMealType}
          onChange={(e) => onSelect(e.target.value)}
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
  );
}
