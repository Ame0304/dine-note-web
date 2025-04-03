import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { RecentRecipe } from "@/lib/services/dashboardService";
import BaseRecipeItem from "@/components/BaseRecipeItem";

export default function DashboardRecipeItem({
  recipe,
}: {
  recipe: RecentRecipe;
}) {
  const viewLink = (
    <Link
      href={`/recipes/${recipe.id}`}
      className="border-2 border-accent-500/80 text-accent-500 hover:bg-accent-500 hover:text-primary-950 rounded-xl p-0.5"
    >
      <ChevronRightIcon className="size-5 stroke-[3]" />
    </Link>
  );

  return (
    <li className="border-b py-2">
      <BaseRecipeItem
        recipe={{ ...recipe, imageUrl: recipe.imageUrl ?? "" }}
        imageSize="lg"
        rightElement={viewLink}
        maxTagWidth="max-w-[200px]"
      />
    </li>
  );
}
