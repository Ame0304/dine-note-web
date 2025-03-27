import React from "react";
import RecipeCard from "./RecipeCard";
import Heading from "@/components/Heading";
import { Recipe } from "@/lib/services/recipeService";

export default function RecipesList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes && recipes.length > 0 ? (
        recipes?.map((recipe) => (
          <RecipeCard
            title={recipe.title}
            categories={recipe.categories}
            imageUrl={recipe.imageUrl}
            tried={recipe.tried}
            key={recipe.id}
            id={recipe.id}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <Heading styled={true} level="h3">
            No recipes found.
          </Heading>
        </div>
      )}
    </div>
  );
}
