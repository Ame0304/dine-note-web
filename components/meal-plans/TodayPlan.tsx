import PlanBox from "./PlanBox";

// receive recipes

export default function TodayPlan() {
  const recipe = {
    id: "1",
    title: "Spaghetti Bolognese",
    imageUrl: "/default-recipe.png",
  };
  return (
    <div>
      <PlanBox type="Breakfast" recipe={recipe} />
      <PlanBox type="Lunch" />
      <PlanBox type="Dinner" />
      <PlanBox type="Snack" />
    </div>
  );
}
