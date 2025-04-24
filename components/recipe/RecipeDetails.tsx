import ExpandableSection from "../ExpandableSection";
import Heading from "@/components/Heading";
import TriedBadge from "./TriedBadge";
import { Recipe } from "@/lib/services/recipeService";
import StepRow from "./StepRow";
import IngredientChecklist from "../dashboard/IngredientChecklist";

export default function RecipeDetails({
  recipe,
  isPublic,
}: {
  recipe: Recipe;
  isPublic?: boolean;
}) {
  return (
    <div className="bg-white/50 rounded-2xl md:w-2/3 shadow-lg py-6 px-8 lg:px-12 mx-auto w-full border-4 border-accent-200">
      {!isPublic && <TriedBadge tried={recipe.tried} id={recipe.id} />}
      <div className="text-center mt-3">
        <Heading level="h3">Recipe Details</Heading>
      </div>

      {/* Ingredients */}
      <ExpandableSection
        icon="🥔"
        title="Ingredients"
        styledColor="bg-accent-400"
      >
        <IngredientChecklist ingredients={recipe.ingredients} />
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
      <ExpandableSection icon="✨" title="Note" styledColor="bg-accent-300">
        {recipe.note}
      </ExpandableSection>
    </div>
  );
}
