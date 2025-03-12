import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import RecipeControls from "@/components/RecipeControls";
import RecipesList from "@/components/RecipesList";
import { useUser } from "@/context/UserContext";
import { useRecipes } from "@/hooks/recipes/useRecipes";
/*
2. Recipe Detail View
      * Large featured image at the top.
      * Recipe info (title, category, tag).
      * Ingredients list (clean, readable format).
      * Step-by-step instructions (numbered or in collapsible sections).
      * Optional personal notes section.
   3. User Actions / Features
      * Edit / Delete Recipe (for the owner).
      * "Cook This" Button – Adds the recipe to Meal Plan.
      * "Share" Button – Allows sharing via link or social media.
*/
export default function RecipesPage() {
  const { user } = useUser();
  const userId = user?.id;

  const { isLoading, recipes, count } = useRecipes(userId);

  if (isLoading) {
    return <Loading message="Loading Recipes..." size="large" />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Recipe Page Header */}
        <Heading level="h2" styled={true}>
          Recipes
        </Heading>

        {/* Recipe Controls:Search, Filter, Sort */}
        <RecipeControls userId={userId} />
      </div>

      {/* Recipe Grid View */}
      <RecipesList recipes={recipes} />

      {/* Pagination */}
      {count > 0 && <Pagination totalItems={count} />}
    </div>
  );
}
