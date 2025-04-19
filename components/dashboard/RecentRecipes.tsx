import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import DashboardRecipeItem from "@/components/dashboard/DashboardRecipeItem";
import { RecentRecipe } from "@/lib/services/dashboardService";

export default function RecentRecipes({
  recentRecipes,
}: {
  recentRecipes: RecentRecipe[];
}) {
  return (
    <Widget size="medium">
      <Heading level="h4" styled="bg-accent-500">
        ☀️ Recent Recipes
      </Heading>
      <ul className="space-y-2">
        {recentRecipes.map((recipe: RecentRecipe) => (
          <DashboardRecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </Widget>
  );
}
