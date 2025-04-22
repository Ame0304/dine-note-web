import Heading from "@/components/Heading";
import PlanRecipeItem from "./PlanRecipeItem";
import { PlanRecipe } from "@/lib/services/mealPlanService";

interface PlanBoxProps {
  typeTitle: string;
  meals?: { id: string; completed: boolean; recipe: PlanRecipe }[];
  selected?: boolean;
  onAdd?: (mealType: string) => void;
  isAdding?: boolean;
  selectedDate: Date;
}

export default function PlanBox({
  typeTitle,
  meals,
  selected,
  onAdd,
  isAdding,
  selectedDate,
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
        className={`mb-2 ${
          selected
            ? "text-accent-500 scale-125 translate-x-10 transition-transform duration-300 ease-in-out"
            : ""
        }`}
      >
        {typeTitle}
      </Heading>
      {/* Placeholder for breakfast recipe */}
      {meals?.length ? (
        <div className="flex flex-col gap-2">
          {meals.map((meal) => (
            <PlanRecipeItem
              key={meal.id}
              mealItemId={meal.id}
              recipe={meal.recipe}
              buttonType="multiple"
              maxTagWidth="max-w-[170px]"
              isCompleted={meal.completed}
              selectedDate={selectedDate}
            />
          ))}
        </div>
      ) : (
        <div
          className={`bg-accent-200/20 border-4 rounded-xl p-5 text-center border-dashed border-accent-200/50 transition-transform duration-300 ease-in-out cursor-pointer  ${
            selected ? "shadow-[0px_0px_30px_8px_#fcdab8] scale-105" : ""
          }`}
          onClick={handleOnClick}
        >
          <span>Add meals for {typeTitle}</span>
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
