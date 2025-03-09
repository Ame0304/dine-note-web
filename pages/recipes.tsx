import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import RecipeCard from "@/components/RecipeCard";
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
   4. Visual & UI Style
      * Warm, cozy, and minimalistic design (think "handwritten recipe journal" meets modern app).
      * Soft rounded cards, clean typography, warm color tones.
      * Recipe images should stand out but not overpower the page.
      * Intuitive navigation (easy access to editing, meal planning, and sharing).
*/
export default function RecipesPage() {
  // TODO:extract user Id directly from useUser hook
  const { user } = useUser();
  const userId = user?.id;
  const { isLoading, recipes } = useRecipes(userId);

  if (isLoading) {
    return <Loading message="Loading Recipes..." size="large" />;
  }

  return (
    <div>
      {/* Recipe Page Header */}
      <div className="inline-block relative">
        <Heading
          level="h2"
          className="relative z-10 text-primary-100 font-bold p-1"
        >
          Recipe
        </Heading>
        <div className="z-2 absolute left-0 right-0 top-1/2 h-2 bg-accent-500 rounded-full"></div>
      </div>
      {/* TODO:Search & Filter & Sort Bar */}

      {/* Recipe Grid View */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Recipe Card */}
        {recipes?.map((recipe) => (
          <RecipeCard
            title={recipe.title}
            categories={recipe.categories}
            imageUrl={recipe.imageUrl}
            tried={recipe.tried}
            key={recipe.id}
            id={recipe.id}
          />
        ))}
      </div>
    </div>
  );
}
