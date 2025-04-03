import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import BaseRecipeItem from "@/components/BaseRecipeItem";

export interface PlanRecipe {
  id: string;
  title: string;
  imageUrl: string;
  categories: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

interface PlanRecipeItemProps {
  recipe: PlanRecipe;
  buttonType?: "add" | "remove";
}

export default function PlanRecipeItem({
  recipe,
  buttonType = "add",
}: PlanRecipeItemProps) {
  const actionButton = (
    <Button size="xs">
      {buttonType === "add" ? (
        <PlusIcon className="size-5 stroke-[4]" />
      ) : (
        <MinusIcon className="size-5 stroke-[4]" />
      )}
    </Button>
  );

  return (
    <BaseRecipeItem
      recipe={recipe}
      imageSize="md"
      rightElement={actionButton}
      className="px-1"
      maxTagWidth="max-w-[150px]"
    />
  );
}
