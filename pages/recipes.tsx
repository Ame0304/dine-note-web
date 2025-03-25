import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import RecipeControls from "@/components/RecipeControls";
import RecipesList from "@/components/RecipesList";
import Button from "@/components/Button";
import RecipeAddForm from "@/components/recipe/RecipeAddForm";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRecipes } from "@/hooks/recipes/useRecipes";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function RecipesPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);

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
        <div className="flex items-center gap-5">
          <Heading level="h2" styled={true}>
            Recipes
          </Heading>

          <Button onClick={() => setIsOpenAdd(true)}>
            Add
            <PlusCircleIcon className="size-5" />
          </Button>
        </div>

        {/* Recipe Controls:Search, Filter, Sort */}
        <RecipeControls userId={userId} />
      </div>

      <RecipeAddForm isOpen={isOpenAdd} onClose={() => setIsOpenAdd(false)} />

      {/* Recipe Grid View */}
      <RecipesList recipes={recipes} />

      {/* Pagination */}
      {count > 0 && <Pagination totalItems={count} />}
    </div>
  );
}
