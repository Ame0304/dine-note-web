import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import BaseRecipeItem from "@/components/BaseRecipeItem";
import { PlanRecipe } from "@/lib/services/mealPlanService";

interface PlanRecipeItemProps {
  recipe: PlanRecipe;
  buttonType?: "add" | "remove";
  maxTagWidth?: string;
  onAction?: () => void;
  isAdding?: boolean;
}

export default function PlanRecipeItem({
  recipe,
  buttonType = "add",
  maxTagWidth = "max-w-[190px]",
  onAction,
  isAdding = false,
}: PlanRecipeItemProps) {
  const handleClick = () => {
    if (onAction && !isAdding) {
      onAction();
    }
  };
  const actionButton = (
    <Button size="xs">
      {buttonType === "add" ? (
        <PlusIcon className="size-5 stroke-[4]" onClick={handleClick} />
      ) : (
        <MinusIcon className="size-5 stroke-[4]" />
      )}
    </Button>
  );

  return (
    <BaseRecipeItem
      recipe={recipe}
      rightElement={actionButton}
      className="px-1"
      maxTagWidth={maxTagWidth}
    />
  );
}
