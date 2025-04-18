import { RecentRecipe } from "@/lib/services/dashboardService";
import BaseRecipeItem from "@/components/BaseRecipeItem";
import ViewLink from "../ViewLink";

export default function DashboardRecipeItem({
  recipe,
}: {
  recipe: RecentRecipe;
}) {
  return (
    <li className="py-1">
      <BaseRecipeItem
        recipe={{ ...recipe, imageUrl: recipe.imageUrl ?? "" }}
        rightElement={ViewLink(recipe.id)}
        maxTagWidth="max-w-[200px]"
      />
    </li>
  );
}
