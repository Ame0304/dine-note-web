import { createClient } from "@/lib/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

import RecipeOverview from "@/components/recipe/RecipeOverview";
import RecipeDetails from "@/components/recipe/RecipeDetails";
import { getRecipeById, Recipe } from "@/lib/services/recipeService";
import GuestOrderForm from "@/components/order/GuestOrderForm";
import Heading from "@/components/Heading";

export interface RecipeWithUsername extends Recipe {
  username: string;
}

export default function PublicRecipeDetail({
  recipe,
}: {
  recipe: RecipeWithUsername;
}) {
  const [isOpenForm, setIsOpenForm] = useState(false);

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="container -my-8 px-4 mx-auto sm:max-w-6xl">
      <Heading level="h2" className="text-center mb-8">
        Hi there! <span className="text-accent-500">{recipe.username} </span>is
        sharing this recipe with you, Enjoy! 🥰
      </Heading>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* Overview card*/}
        <RecipeOverview
          recipe={recipe}
          isPublic={true}
          onOpen={() => setIsOpenForm(true)}
        />
        {/* Recipe detailt: Ingredients,steps & note */}
        <RecipeDetails recipe={recipe} isPublic={true} />

        <GuestOrderForm
          isOpen={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          recipeId={recipe.id}
          recipeTitle={recipe.title}
          userId={recipe.userId}
        />
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
