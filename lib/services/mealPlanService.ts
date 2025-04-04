import { createClient } from "@/lib/supabase/component";
import { FetchedRecipeCategoryLink } from "./dashboardService";

interface FetchedRecipe {
  id: string;
  title: string;
  imageUrl: string;
  recipe_categories: FetchedRecipeCategoryLink[];
}

export interface PlanRecipe {
  id: string;
  title: string;
  imageUrl: string;
  categories: {
    id: string;
    name: string;
    color: string;
  }[];
}

const supabase = createClient();

export async function getPlanRecipes(userId: string) {
  const { data, error: recipeError } = await supabase
    .from("recipes")
    .select(
      `
          id,
          title,
          imageUrl,
          recipe_categories(category:categories(name,id,color))
        `
    )
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  if (recipeError) throw Error(recipeError.message);

  if (!data) {
    return [];
  }

  const recipes = data as unknown as FetchedRecipe[];
  console.log("Fetched recipes:", recipes);

  const mealPlanRecipes: PlanRecipe[] = recipes.map((recipe) => {
    const categories = recipe.recipe_categories.map((cat) => ({
      id: cat.category.id,
      name: cat.category.name,
      color: cat.category.color,
    }));

    return {
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.imageUrl,
      categories,
    };
  });

  return mealPlanRecipes;
}
