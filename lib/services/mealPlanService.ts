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

export interface MealPlanItem {
  id: string;
  meal_type: string;
  recipe: PlanRecipe;
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

export async function getMealPlans(userId: string, date: string) {
  // 1. Fetch the meal plan ID for the given date
  const { data: mealPlan, error: planError } = await supabase
    .from("meal_plans")
    .select("id")
    .eq("user_id", userId)
    .eq("date", date)
    .maybeSingle();

  if (planError) throw new Error(planError.message);

  if (!mealPlan) {
    return { mealPlanId: null, meals: [] };
  }

  // 2.Fetch meal plan items (recipes assigned to this meal plan)
  const { data: mealPlanItems, error: itemsError } = await supabase
    .from("meal_plan_items")
    .select(
      `
      id,
      meal_type,
      recipe:recipes(id, title, imageUrl, recipe_categories(category:categories(id, name, color)))
    `
    )
    .eq("meal_plan_id", mealPlan.id)
    .order("meal_type", { ascending: true });
  console.log("mealPlanItems", mealPlanItems);

  if (itemsError) throw new Error(itemsError.message);

  const transformedItems: MealPlanItem[] = mealPlanItems.map((item) => {
    const recipe = item.recipe as unknown as FetchedRecipe;

    const categories = recipe.recipe_categories.map((cat) => ({
      id: cat.category.id,
      name: cat.category.name,
      color: cat.category.color,
    }));

    return {
      id: item.id,
      meal_type: item.meal_type,
      recipe: {
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.imageUrl,
        categories,
      },
    };
  });

  console.log("transformedItems", transformedItems);

  return { mealPlanId: mealPlan.id, meals: transformedItems };
}
