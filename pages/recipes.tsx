import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import RecipeControls from "@/components/RecipeControls";
import RecipesList from "@/components/RecipesList";
import { useUser } from "@/context/UserContext";
import { useRecipes } from "@/hooks/recipes/useRecipes";

export default function RecipesPage() {
  const { user } = useUser();
  const userId = user?.id;

  const { isLoading, recipes, count } = useRecipes(userId);

  console.log(recipes);

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
