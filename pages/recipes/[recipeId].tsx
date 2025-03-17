import Button from "@/components/Button";
import Loading from "@/components/Loading";
import RecipeOverview from "@/components/RecipeOverview";
import RecipeDetails from "@/components/RecipeDetails";

import { useRecipe } from "@/hooks/recipes/useRecipe";
import { useRouter } from "next/router";

function RecipeDetail() {
  const router = useRouter();
  const { recipe, isLoading } = useRecipe(router.query.recipeId as string);

  if (isLoading) return <Loading />;
  {
    /* TODO: If recipe is not found, show a message */
  }
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="container mx-auto sm:max-w-6xl">
      {/* Back button */}
      <Button onClick={() => router.push("/recipes")}>Back</Button>
      <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
        {/* Overview card*/}
        <RecipeOverview recipe={recipe} />
        {/* Recipe detailt: Ingredients,steps & note */}
        <RecipeDetails recipe={recipe} />
      </div>
    </div>
  );
}

export default RecipeDetail;
