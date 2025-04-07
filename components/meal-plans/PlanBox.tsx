import Heading from "@/components/Heading";
import PlanRecipeItem from "./PlanRecipeItem";
import { PlanRecipe } from "@/lib/services/mealPlanService";

interface PlanBoxProps {
  typeTitle: string;
  recipes?: PlanRecipe[];
  selected?: boolean;
  onAdd?: (mealType: string) => void;
  isAdding?: boolean;
}

export default function PlanBox({
  typeTitle,
  recipes,
  selected,
  onAdd,
  isAdding,
}: PlanBoxProps) {
  const handleOnClick = () => {
    if (onAdd && !isAdding) {
      onAdd(typeTitle.toLowerCase());
    }
  };

  return (
    <div>
      <Heading
        level="h5"
        className={`mb-2 ${selected ? "text-accent-500" : ""}`}
      >
        {typeTitle}
      </Heading>
      {/* Placeholder for breakfast recipe */}
      {recipes?.length ? (
        <div className="flex flex-col gap-2">
          {recipes.map((recipe: PlanRecipe) => (
            <PlanRecipeItem
              key={recipe.id}
              recipe={recipe}
              buttonType="remove"
              maxTagWidth="max-w-[220px]"
            />
          ))}
        </div>
      ) : (
        <div
          className={`bg-accent-200/20 border-4 rounded-xl p-4 text-center border-dashed border-accent-200/50 transition-transform duration-300 ease-in-out  ${
            selected ? "shadow-[0px_0px_60px_16px_#fcdab8] scale-105" : ""
          }`}
        >
          <span>No meals planned for {typeTitle}</span>
        </div>
      )}

      {/* Add button - click to set select option */}
      <div
        className="flex items-center justify-center w-full"
        onClick={handleOnClick}
      >
        <div className="h-0.5 bg-accent-200 flex-grow"></div>
        <button className="mx-2 text-accent-200 text-lg font-bold">+</button>
        <div className="h-0.5 bg-accent-200 flex-grow"></div>
      </div>
    </div>
  );
}
