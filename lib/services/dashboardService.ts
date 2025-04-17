import { SupabaseClient } from "@supabase/supabase-js";
import { calculateStreaks } from "@/lib/helpers";
import { subMonths, format, parseISO, eachDayOfInterval } from "date-fns";

export interface AnalyticsData {
  totalRecipes: string;
  triedRecipesPercentage: number;
  triedVsUntriedData: Array<{ name: string; value: number }>;
  categoryChart: Array<{ name: string; count: number; color: string }>;
  recentRecipes: RecentRecipe[];
}

export interface RecentRecipe {
  id: string;
  title: string;
  imageUrl: string | null;
  categories: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  created_at: string;
}

interface FetchedCategory {
  id: string;
  name: string;
  color: string;
}
export interface FetchedRecipeCategoryLink {
  category: FetchedCategory;
}

interface FetchedRecipe {
  id: string;
  tried: boolean;
  title: string;
  imageUrl: string;
  recipe_categories: FetchedRecipeCategoryLink[];
  created_at: string;
}

export interface MealPlanTrendData {
  date: string; // Expecting 'YYYY-MM-DD' format
  count: number;
}

export async function fetchDashboardRecipeData(
  userId: string,
  supabase: SupabaseClient
): Promise<AnalyticsData> {
  try {
    // 1. Fetch ALL recipes with their categories in a single query
    const {
      data,
      error: recipesError,
      count: totalRecipes,
    } = await supabase
      .from("recipes")
      .select(
        `
          id,
          title,
          imageUrl,
          tried,
          created_at,
          recipe_categories(category:categories(name,id,color))
        `,
        { count: "exact" }
      )
      .eq("userId", userId)
      .order("created_at", { ascending: false });

    const recipes = data as FetchedRecipe[] | null;

    if (recipesError) throw recipesError;

    if (!recipes) {
      throw new Error("No recipes found");
    }

    // 2. Process the recipe data to derive all the metrics needed

    // Stats calculation
    const triedRecipes = recipes.filter((recipe) => recipe.tried).length;
    const triedRecipesPercentage = totalRecipes
      ? Math.round((triedRecipes / totalRecipes) * 100)
      : 0;

    // Tried vs Untried data for bar chart
    const triedVsUntriedData = [
      { name: "Tried", value: triedRecipes },
      { name: "Untried", value: totalRecipes! - triedRecipes },
    ];

    // Recent recipes transformation (top 3)
    const recentRecipes: RecentRecipe[] = recipes.slice(0, 3).map((recipe) => {
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
        created_at: recipe.created_at,
      };
    });

    // Category data for pie chart
    const categoryMap = new Map<
      string,
      {
        count: number;
        name: string;
        color: string;
      }
    >();

    recipes.forEach((recipe) => {
      recipe.recipe_categories.forEach((cat) => {
        const category = cat.category;
        const key = category.id;

        if (categoryMap.has(key)) {
          categoryMap.get(key)!.count += 1;
        } else {
          categoryMap.set(key, {
            count: 1,
            name: cat.category.name,
            color: category.color,
          });
        }
      });
    });

    const categoryChart = Array.from(categoryMap.values());

    return {
      totalRecipes: totalRecipes !== null ? totalRecipes.toString() : "0",
      triedRecipesPercentage,
      triedVsUntriedData,
      recentRecipes,
      categoryChart,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to load dashboard data");
  }
}

export async function getStreaks(userId: string, supabase: SupabaseClient) {
  // 1. Get cooked dates
  const { data, error } = await supabase
    .from("meal_plans")
    .select(
      `
    date,
    meal_plan_items!inner(completed)
  `
    )
    .eq("user_id", userId)
    .eq("meal_plan_items.completed", true);

  if (error) {
    console.error("Error fetching cooked dates:", error);
  }

  const cookedDates = Array.from(
    new Set(data?.map((entry) => entry.date))
  ).sort();

  const { longest, current } = calculateStreaks(cookedDates);

  return { longest, current };
}

export async function getMealPlanTrend(
  userId: string,
  supabase: SupabaseClient,
  monthsAgo: number = 3
): Promise<MealPlanTrendData[]> {
  const today = new Date();
  const startDate = subMonths(today, monthsAgo);

  // 1. Fetch existing meal plan data
  const { data, error } = await supabase
    .from("meal_plans")
    .select(`date,meal_plan_items(count)`)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching meal plan trend:", error);
    return [];
  }

  // 2. Create a lookup map from the fetched data
  const countsMap = new Map<string, number>();
  if (data) {
    data.forEach((plan) => {
      // Ensure date is in 'YYYY-MM-DD' format if it isn't already
      const formattedDate = format(parseISO(plan.date), "yyyy-MM-dd");
      const count = plan.meal_plan_items[0]?.count || 0;
      if (count > 0) {
        // Only store dates with actual counts
        countsMap.set(formattedDate, count);
      }
    });
  }

  // 3. Generate all dates in the desired interval
  const allDatesInRange = eachDayOfInterval({ start: startDate, end: today });

  // 4. Map all dates to the required format, using the lookup map
  const formattedData = allDatesInRange.map((date): MealPlanTrendData => {
    const dateString = format(date, "yyyy-MM-dd");
    return {
      date: dateString,
      count: countsMap.get(dateString) || 0, // Default to 0 if not found in map
    };
  });

  return formattedData;
}
