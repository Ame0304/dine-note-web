import { createClient } from "@/lib/supabase/component";
import { PAGE_SIZE } from "../constants";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tried: boolean;
  categories: string[];
  ingredients: string[];
  note: string;
  steps: Array<{ step: number; text: string }>;
}

interface FetchRecipesParams {
  userId: string | undefined;
  page?: number;
}

const supabase = createClient();

export async function getRecipes({ userId, page = 1 }: FetchRecipesParams) {
  if (!userId) {
    return { recipes: [], count: 0 };
  }

  let query = supabase
    .from("recipes")
    .select(
      `*,recipe_ingredients(ingredients(name),quantity),recipe_categories(category:categories(name))`,
      { count: "exact" }
    )
    .eq("userId", userId);

  // Pagination
  if (page) {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE - 1;
    query = query.range(startIndex, endIndex);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return { recipes: [], count: count || 0 }; // Return count even with empty results
  }

  // format the data
  const recipes = data.map((recipe) => ({
    id: recipe.id.toString(),
    title: recipe.title,
    description: recipe.description,
    imageUrl: recipe.imageUrl,
    tried: recipe.tried,
    note: recipe.note,
    steps: recipe.steps || [],
    ingredients: recipe.recipe_ingredients.map(
      ({
        quantity,
        ingredients,
      }: {
        quantity: string;
        ingredients: { name: string };
      }) => ({
        name: ingredients.name,
        quantity: quantity,
      })
    ),
    categories: recipe.recipe_categories.map(
      (item: { category: { name: string } }) => item.category.name
    ),
  }));

  return { recipes, count };
}

export async function deleteRecipe(recipeId: string) {
  const { error } = await supabase.from("recipes").delete().eq("id", recipeId);
  if (error) {
    throw new Error(error.message);
  }
  return;
}

export async function updateRecipe(tried: boolean, recipeId: string) {
  // const { data, error } = await supabase
  //   .from("recipes")
  //   .update({
  //     title: recipe.title,
  //     description: recipe.description,
  //     imageUrl: recipe.imageUrl,
  //     tried: recipe.tried,
  //     note: recipe.note,
  //     steps: recipe.steps,
  //   })
  //   .eq("id", recipe.id);
  const { error } = await supabase
    .from("recipes")
    .update({
      tried: tried,
    })
    .eq("id", recipeId);

  if (error) {
    console.error("Update error:", error);
    throw new Error(error.message);
  }

  return;
}
