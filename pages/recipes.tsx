import { useState, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@/components/Error";
import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import Pagination from "@/components/recipe/Pagination";
import RecipeControls from "@/components/recipe/RecipeControls";
import RecipesList from "@/components/recipe/RecipesList";
import Button from "@/components/Button";
import { useUser } from "@/context/UserContext";
import { useRecipes } from "@/hooks/recipes/useRecipes";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const RecipeAddForm = lazy(() => import("@/components/recipe/RecipeAddForm"));

export default function RecipesPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const { user } = useUser();
  const userId = user?.id;

  const { isLoading, recipes, count } = useRecipes(userId);

  if (isLoading) {
    return <Loading message="Loading Recipes..." size="large" />;
  }

  return (
    <>
      <div className="flex flex-col justify-between items-center mb-4 md:flex-row">
        {/* Recipe Page Header */}
        <div className="flex items-center gap-5">
          <Heading level="h2" styled="bg-accent-500">
            Recipes
          </Heading>

          <Button onClick={() => setIsOpenAdd(true)}>
            Add
            <PlusCircleIcon className="size-6 stroke-[3]" />
          </Button>
        </div>

        {/* Recipe Controls:Search, Filter, Sort */}
        <RecipeControls userId={userId} />
      </div>

      {isOpenAdd && (
        <RecipeAddForm
          isOpen={isOpenAdd}
          onClose={() => setIsOpenAdd(false)}
          userId={String(userId)}
        />
      )}

      {/* Recipe Grid View */}
      <ErrorBoundary FallbackComponent={Error}>
        <RecipesList recipes={recipes} />
      </ErrorBoundary>

      {/* Pagination */}
      {count > 0 && <Pagination totalItems={count} />}
    </>
  );
}
