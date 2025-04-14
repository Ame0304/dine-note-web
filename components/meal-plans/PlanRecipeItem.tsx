import { MinusIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import BaseRecipeItem from "@/components/BaseRecipeItem";
import { PlanRecipe } from "@/lib/services/mealPlanService";
import useDeleteMeal from "@/hooks/meal-plans/useDeleteMeal";
import useToggleCompleted from "@/hooks/meal-plans/useToggleCompleted";

interface PlanRecipeItemProps {
  recipe: PlanRecipe;
  buttonType?: "add" | "multiple";
  maxTagWidth?: string;
  onAction?: () => void;
  isAdding?: boolean;
  mealItemId?: string;
  isAlreadyPlanned?: boolean;
  isCompleted?: boolean;
}

export default function PlanRecipeItem({
  recipe,
  buttonType = "add",
  maxTagWidth = "max-w-[190px]",
  onAction,
  isAdding = false,
  mealItemId,
  isAlreadyPlanned = false,
  isCompleted = false,
}: PlanRecipeItemProps) {
  const { deleteMeal, isDeleting } = useDeleteMeal();
  const { toggleCompleted, isUpdating } = useToggleCompleted();
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

  const handleToggleCompleted = () => {
    if (mealItemId) {
      toggleCompleted({ mealPlanItemId: mealItemId, completed: !isCompleted });
    }
  };

  // TODO: add recipe detail link to plan recipe item

  const actionButtons = (
    <>
      {buttonType === "add" && (
        <Button size="xs" disabled={isAdding}>
          {isAlreadyPlanned ? (
            <CheckIcon className="size-5 stroke-[4]" />
          ) : (
            <PlusIcon className="size-5 stroke-[4]" onClick={handleClick} />
          )}
        </Button>
      )}
      {buttonType === "multiple" && (
        <div className="flex gap-1">
          <Button size="xs" disabled={isDeleting} onClick={handleDelete}>
            <MinusIcon className="size-5 stroke-[4]" />
          </Button>

          <button
            className={`px-1 py-1 text-sm   text-primary-950 hover:bg-accent-400 rounded-xl shadow-lg font-medium ${
              isCompleted ? "bg-accent-400" : "bg-accent-500"
            }`}
            onClick={handleToggleCompleted}
            disabled={isUpdating}
          >
            <CheckIcon className="size-5 stroke-[4]" />
          </button>
        </div>
      )}
    </>
  );

  return (
    <BaseRecipeItem
      className={`px-2 py-1 ${
        isCompleted ? "bg-accent-500/20  rounded-xl" : ""
      }`}
      recipe={recipe}
      rightElement={actionButtons}
      maxTagWidth={maxTagWidth}
    />
  );
}
