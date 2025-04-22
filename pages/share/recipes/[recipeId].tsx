import RecipeOverview from "@/components/recipe/RecipeOverview";
import RecipeDetails from "@/components/recipe/RecipeDetails";
import { createClient } from "@/lib/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import { getRecipeById, Recipe } from "@/lib/services/recipeService";

interface RecipeWithUsername extends Recipe {
  username: string;
}

export default function PublicRecipeDetail({
  recipe,
}: {
  recipe: RecipeWithUsername;
}) {
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="container px-4 mx-auto sm:max-w-6xl">
      <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
        {/* Overview card*/}
        <RecipeOverview
          recipe={recipe}
          isPublic={true}
          username={recipe.username}
        />
        {/* Recipe detailt: Ingredients,steps & note */}
        <RecipeDetails recipe={recipe} isPublic={true} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { recipeId } = context.params || {};
  if (!recipeId || typeof recipeId !== "string") {
    return { notFound: true };
  }

  const supabase = createClient(context);

  const recipe = await getRecipeById(recipeId as string, supabase);

  if (!recipe) {
    return { notFound: true };
  }

  return {
    props: {
      recipe,
    },
  };
}
