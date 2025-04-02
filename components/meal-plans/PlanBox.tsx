import Heading from "@/components/Heading";
import PlanRecipeItem from "./PlanRecipeItem";
import { PlanRecipe } from "./PlanRecipeItem";

interface PlanBoxProps {
  type: string;
  recipe?: PlanRecipe;
}

export default function PlanBox({ type, recipe }: PlanBoxProps) {
  return (
    <div>
      <Heading level="h5" className="mb-2">
        {type}
      </Heading>
      {/* Placeholder for breakfast recipe */}
      {recipe ? (
        <PlanRecipeItem recipe={recipe} />
      ) : (
        <div className="bg-accent-200/20 border-4 border-dashed border-accent-200/50 rounded-xl p-3 text-center">
          <span>No meals planned for {type}</span>
        </div>
      )}
      {/* Add button - click to set select option */}
      <div className="flex items-center justify-center w-full">
        <div className="h-0.5 bg-accent-200 flex-grow"></div>
        <button className="mx-2 text-accent-200 text-lg font-bold">+</button>
        <div className="h-0.5 bg-accent-200 flex-grow"></div>
      </div>
    </div>
  );
}
