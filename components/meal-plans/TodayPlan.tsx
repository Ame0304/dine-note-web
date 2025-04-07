import PlanBox from "./PlanBox";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import useMealPlans from "@/hooks/meal-plans/useMealPlans";

interface TodayPlanProps {
  userId: string;
  selectedDate: Date;
  selectedMealType: string;
  onAdd: (mealType: string) => void;
  isAdding?: boolean;
}

export default function TodayPlan({
  userId,
  selectedDate,
  selectedMealType,
  onAdd,
  isAdding,
}: TodayPlanProps) {
  // Fetch the meal plan for the selected date
  const { mealPlan, isLoading, error } = useMealPlans(userId, selectedDate);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Error fetching meal plans" />;
  }

  const meals = mealPlan?.meals;

  // Get the recipes array for each meal type
  function getRecipesByMealType(mealType: string) {
    const mealsOfThisType = meals?.filter(
      (meal) => meal.meal_type === mealType
    );
    const recipes = mealsOfThisType?.map((meal) => {
      return {
        id: meal.recipe.id,
        title: meal.recipe.title,
        imageUrl: meal.recipe.imageUrl,
        categories: meal.recipe.categories,
      };
    });
    return recipes;
  }

  // Get recipes for each meal type
  const lunchRecipes = getRecipesByMealType("lunch") || [];
  const breakfastRecipes = getRecipesByMealType("breakfast") || [];
  const dinnerRecipes = getRecipesByMealType("dinner") || [];
  const snackRecipes = getRecipesByMealType("snack") || [];

  const planBoxes = [
    {
      type: "Breakfast",
      recipes: breakfastRecipes,
      selected: selectedMealType === "breakfast",
    },
    {
      type: "Lunch",
      recipes: lunchRecipes,
      selected: selectedMealType === "lunch",
    },
    {
      type: "Dinner",
      recipes: dinnerRecipes,
      selected: selectedMealType === "dinner",
    },
    {
      type: "Snack",
      recipes: snackRecipes,
      selected: selectedMealType === "snack",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {planBoxes.map((box) => (
        <PlanBox
          key={box.type}
          recipes={box.recipes}
          selected={box.selected}
          typeTitle={box.type}
          onAdd={onAdd}
          isAdding={isAdding}
        />
      ))}
    </div>
  );
}
