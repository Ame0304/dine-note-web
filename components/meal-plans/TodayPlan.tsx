import PlanBox from "./PlanBox";

// receive recipes

export default function TodayPlan() {
  const recipe = {
    id: "1",
    title: "Spaghetti Bolognese",
    imageUrl: "/default-recipe.png",
    categories: [
      { id: "1", name: "Italian", color: "red" },
      { id: "2", name: "Pasta", color: "blue" },
    ],
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <PlanBox type="Breakfast" recipe={recipe} />
      <PlanBox type="Lunch" />
      <PlanBox type="Dinner" />
      <PlanBox type="Snack" />
    </div>
  );
}
