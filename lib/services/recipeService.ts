import { createClient } from "@/lib/supabase/component";

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
  pageSize?: number;
}

const supabase = createClient();

export async function getRecipes({
  userId,
  page = 1,
  pageSize = 12,
}: FetchRecipesParams) {
  // Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  // Fetch recipes from Supabase
  const { data, error } = await supabase
    .from("recipes")
    .select(
      `*,recipe_ingredients(ingredients(name),quantity),recipe_categories(category:categories(name))`
    )
    .eq("userId", userId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: true })
    .range(startIndex, endIndex);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data.map((recipe) => ({
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
