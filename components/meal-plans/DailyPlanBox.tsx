import Heading from "../Heading";
import TodayPlan from "./TodayPlan";
import { PlanRecipe } from "@/lib/services/mealPlanService";

interface DailyPlanBoxProps {
  selectedDate: Date;
  mealPlan: {
    mealPlanId: string;
    meals: {
      id: string;
      recipe: PlanRecipe;
      meal_type: string;
      completed: boolean;
    }[];
  };
  selectedMealType: string;
  isAdding: boolean;
  onAdd: (mealType: string) => void;
}

export default function DailyPlanBox({
  selectedDate,
  mealPlan,
  selectedMealType,
  isAdding,
  onAdd,
}: DailyPlanBoxProps) {
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
    <div className="bg-white/50 shadow-lg shadow-primary-900 rounded-xl p-4 flex flex-col gap-4 h-full">
      <div className="flex flex-col items-start justify-between">
        <Heading level="h2" styled="bg-accent-400">
          {selectedDate.toDateString() === today.toDateString()
            ? "Today's Plan"
            : "Meal Plan for"}
        </Heading>
        <span className="text-accent-200/50 font-medium">{formattedDate}</span>
      </div>

      <TodayPlan
        mealPlan={mealPlan || { mealPlanId: "", meals: [] }}
        selectedMealType={selectedMealType}
        onAdd={onAdd}
        isAdding={isAdding}
      />
    </div>
  );
}
