import {
  MinusIcon,
  PlusIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "../Button";
import BaseRecipeItem from "@/components/BaseRecipeItem";
import { PlanRecipe } from "@/lib/services/mealPlanService";
import useDeleteMeal from "@/hooks/meal-plans/useDeleteMeal";

interface PlanRecipeItemProps {
  recipe: PlanRecipe;
  buttonType?: "add" | "remove";
  maxTagWidth?: string;
  onAction?: () => void;
  isAdding?: boolean;
  mealItemId?: string;
  isAlreadyPlanned?: boolean;
}

export default function PlanRecipeItem({
  recipe,
  buttonType = "add",
  maxTagWidth = "max-w-[190px]",
  onAction,
  isAdding = false,
  mealItemId,
  isAlreadyPlanned = false,
}: PlanRecipeItemProps) {
  const { deleteMeal, isDeleting } = useDeleteMeal();
  const handleClick = () => {
    if (onAction && !isAdding) {
      onAction();
    }
  };

  const handleDelete = () => {
    if (mealItemId) {
      deleteMeal(mealItemId);
    }
  };

  const actionButton = (
    <Button size="xs" disabled={isAdding || isDeleting || isAlreadyPlanned}>
      {buttonType === "add" ? (
        isAlreadyPlanned ? (
          <CheckCircleIcon className="size-5 stroke-[4] stroke-accent-200" />
        ) : (
          <PlusIcon className="size-5 stroke-[4]" onClick={handleClick} />
        )
      ) : (
        <MinusIcon className="size-5 stroke-[4]" onClick={handleDelete} />
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
