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
  console.log(recipe);
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

  const actionButtons = (
    <>
      {buttonType === "add" && (
        <Button
          size="xs"
          disabled={isAdding}
          variant="mealPlan"
          className={`${
            isAlreadyPlanned
              ? "bg-accent-200 text-accent-500"
              : "bg-primary-950"
          }`}
        >
          {isAlreadyPlanned ? (
            <CheckIcon className="size-5 stroke-[4]" />
          ) : (
            <PlusIcon className="size-5 stroke-[4]" onClick={handleClick} />
          )}
        </Button>
      )}
      {buttonType === "multiple" && (
        <div className="flex gap-1">
          <Button
            size="xs"
            variant="mealPlan"
            disabled={isDeleting}
            onClick={handleDelete}
            className="bg-primary-950 text-primary-100"
          >
            <MinusIcon className="size-5 stroke-[4]" />
          </Button>

          <button
            className={`px-0.5 py-0.5 text-sm rounded-xl shadow-lg font-medium border-2 border-accent-200  ${
              isCompleted
                ? "bg-accent-500 text-primary-950"
                : "bg-primary-950 hover:bg-accent-200 hover:text-accent-500"
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
      className={`px-2 py-1 rounded-xl ${
        isCompleted ? "bg-accent-200 text-primary-950" : ""
      } `}
      recipe={recipe}
      rightElement={actionButtons}
      maxTagWidth={maxTagWidth}
    />
  );
}
