import { createClient } from "@/lib/supabase/component";
import { PAGE_SIZE } from "../constants";
import { format, parseISO } from "date-fns";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tried: boolean;
  categories: Array<{ name: string; id: string; color: string }>;
  ingredients: Array<{ name: string; quantity: string }>;
  note: string;
  steps: Array<{ step: number; instruction: string }>;
  created_at: string;
}

interface FetchRecipesParams {
  userId: string | undefined;
  page?: number;
  sort?: { field: string; direction: string };
  filter?: string;
  searchTerm?: string;
}

const supabase = createClient();

export async function getRecipes({
  userId,
  page,
  sort,
  filter,
  searchTerm,
}: FetchRecipesParams) {
  if (!userId) {
    return { recipes: [], count: 0 };
  }

  let query = supabase
    .from("recipes")
    .select(
      `*,recipe_ingredients(ingredients(name),quantity),recipe_categories!inner(category:categories(name,id,color))`,
      { count: "exact" } // Get the total count of recipes
    )
    .eq("userId", userId);

  // Search
  if (searchTerm?.trim()) {
    const term = `%${searchTerm.trim().toLowerCase()}%`;
    query = query.or(`title.ilike.${term},description.ilike.${term}`);
  }

  // Filter
  if (filter && filter !== "0") {
    const filterId = parseInt(filter);
    if (!isNaN(filterId)) {
      query = query.filter("recipe_categories.categoryId", "eq", filterId);
    }
  }

  // Sort
  if (sort?.field && sort?.direction) {
    if (sort.field === "date") {
      query = query.order("created_at", {
        ascending: sort.direction === "asc",
      });
    } else if (sort.field === "title") {
      query = query.order("title", { ascending: sort.direction === "asc" });
    }
  } else {
    // Default sorting
    query = query.order("created_at", { ascending: false });
  }

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
    created_at: format(parseISO(recipe.created_at), "yyyy/MM/dd"),
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
      (item: { category: { name: string; id: string; color: string } }) => ({
        name: item.category.name,
        id: item.category.id,
        color: item.category.color || "blue",
      })
    ),
  }));

  return { recipes, count };
}

export async function getRecipeById(recipeId: string) {
  const { data, error } = await supabase
    .from("recipes")
    .select(
      `*,recipe_ingredients(ingredients(name),quantity),recipe_categories!inner(category:categories(name,id,color))`
    )
    .eq("id", recipeId);

  if (error) {
    throw new Error(error.message);
  }

  const formattedRecipe = {
    id: data[0].id.toString(),
    created_at: format(parseISO(data[0].created_at), "yyyy/MM/dd"),
    title: data[0].title,
    description: data[0].description,
    imageUrl: data[0].imageUrl,
    tried: data[0].tried,
    note: data[0].note,
    steps: data[0].steps,
    ingredients: data[0].recipe_ingredients.map(
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
    categories: data[0].recipe_categories.map(
      (item: { category: { id: string; name: string; color: string } }) => ({
        name: item.category.name,
        id: item.category.id,
        color: item.category.color || "blue",
      })
    ),
  };

  return formattedRecipe;
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
