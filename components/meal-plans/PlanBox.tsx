import Heading from "@/components/Heading";
import PlanRecipeItem from "./PlanRecipeItem";
import { PlanRecipe } from "@/lib/services/mealPlanService";

interface PlanBoxProps {
  type: string;
  recipes?: PlanRecipe[];
}

export default function PlanBox({ type, recipes }: PlanBoxProps) {
  return (
    <div>
      <Heading level="h5" className="mb-2">
        {type}
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
        <div className="bg-accent-200/20 border-4 border-dashed border-accent-200/50 rounded-xl p-4 text-center">
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
