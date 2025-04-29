import Button from "@/components/Button";
import Loading from "@/components/Loading";
import RecipeOverview from "@/components/recipe/RecipeOverview";
import RecipeDetails from "@/components/recipe/RecipeDetails";

import { useState } from "react";

import { useRecipe } from "@/hooks/recipes/useRecipe";
import { useRouter } from "next/router";
import RecipeUpdateForm from "@/components/recipe/RecipeUpdateForm";

export default function RecipeDetail() {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const router = useRouter();
  const { recipe, isLoading } = useRecipe(router.query.recipeId as string);

  if (isLoading) return <Loading size="large" />;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="container px-4 mx-auto sm:max-w-6xl">
      {/* Back button */}
      <Button onClick={() => router.push("/recipes")}>Back</Button>
      <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
        {/* Overview card*/}
        <RecipeOverview recipe={recipe} onOpen={() => setIsOpenEdit(true)} />
        {/* Recipe detailt: Ingredients,steps & note */}
        <RecipeDetails recipe={recipe} />
      </div>
      <RecipeUpdateForm
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        recipe={recipe}
      />
    </div>
  );
}
