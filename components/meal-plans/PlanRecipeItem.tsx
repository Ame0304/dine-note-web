import Image from "next/image";
import Button from "../Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export interface PlanRecipe {
  id: string;
  title: string;
  imageUrl: string;
}

interface PlanRecipeItemProps {
  recipe: PlanRecipe;
  size?: "small" | "large";
  hasButton?: boolean;
}

export default function PlanRecipeItem({
  recipe,
  size = "small",
  hasButton = false,
}: PlanRecipeItemProps) {
  return (
    <div className="flex items-center gap-4 px-3">
      <Image
        src={recipe.imageUrl || "/default-recipe.png"}
        alt="recipe image of ${title}"
        width={size === "large" ? 80 : 50}
        height={size === "large" ? 80 : 50}
        className={`rounded-full inline-block ${
          size === "large" ? "w-20 h-20" : "w-14 h-14"
        }`}
      />

      <p className="text-lg font-semibold">{recipe.title}</p>
      {hasButton && (
        <Button size="xs">
          <PlusIcon className="size-6" />
        </Button>
      )}
    </div>
  );
}
