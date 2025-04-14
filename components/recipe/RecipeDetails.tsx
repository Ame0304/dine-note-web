import ExpandableSection from "../ExpandableSection";
import IngredientRow from "./IngredientRow";
import Heading from "@/components/Heading";
import TriedBadge from "./TriedBadge";
import { Recipe } from "@/lib/services/recipeService";
import StepRow from "./StepRow";

export default function RecipeDetails({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-white/50 rounded-2xl md:w-2/3 shadow-lg py-6 px-8 mx-auto w-full border-4 border-accent-200">
      <TriedBadge tried={recipe.tried} id={recipe.id} />
      <div className="text-center">
        <Heading level="h3" styled="bg-accent-500" className="text-accent-200">
          Recipe Details
        </Heading>
      </div>

      {/* Ingredients */}
      <ExpandableSection icon="🥔" title="Ingredients">
        <div className="flex flex-col gap-3 w-full ">
          {recipe.ingredients.map((ingredient) => (
            <IngredientRow
              key={ingredient.name}
              name={ingredient.name}
              quantity={ingredient.quantity}
            />
          ))}
        </div>
      </ExpandableSection>
      {/* Steps */}
      <ExpandableSection icon="🥘" title="Steps">
        {/* Steps with number markers */}
        {recipe.steps &&
          recipe.steps.map((item, index) => (
            <StepRow key={`step ${index}`} item={item} index={index} />
          ))}
      </ExpandableSection>
      {/* Note */}
      <ExpandableSection icon="✨" title="Note">
        {recipe.note}
      </ExpandableSection>
    </div>
  );
}
