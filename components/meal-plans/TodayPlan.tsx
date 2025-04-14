import PlanBox from "./PlanBox";
import { PlanRecipe } from "@/lib/services/mealPlanService";

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
}

export default function TodayPlan({
  mealPlan,
  selectedMealType,
  onAdd,
  isAdding,
}: TodayPlanProps) {
  const meals = mealPlan?.meals;

  // Get meals for each meal type
  const getMealsByMealType = (mealType: string) => {
    const mealsOfThisType = meals?.filter(
      (meal) => meal.meal_type === mealType
    );
    const filteredMeals = mealsOfThisType?.map((meal) => {
      return {
        id: meal.id,
        completed: meal.completed,
        recipe: {
          id: meal.recipe.id,
          title: meal.recipe.title,
          imageUrl: meal.recipe.imageUrl,
          categories: meal.recipe.categories,
        },
      };
    });

    return filteredMeals;
  };

  // Get recipes for each meal type
  const lunchMeals = getMealsByMealType("lunch") || [];
  const breakfastMeals = getMealsByMealType("breakfast") || [];
  const dinnerMeals = getMealsByMealType("dinner") || [];
  const snackMeals = getMealsByMealType("snack") || [];

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
        />
      ))}
    </div>
  );
}
