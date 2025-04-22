import { createClient } from "@/lib/supabase/component";
import { PAGE_SIZE } from "../constants";
import { format, parseISO } from "date-fns";
import { Ingredient } from "@/components/recipe/IngredientsManager";
import { RecipeAddFormValues } from "@/components/recipe/RecipeAddForm";
import { SupabaseClient } from "@supabase/supabase-js";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tried: boolean;
  categories: Array<{ name: string; id: string; color: string }>;
  ingredients: Array<{ id: string; name: string; quantity: string }>;
  note: string;
  steps: Array<string>;
  created_at: string;
  userId: string;
}

interface FetchRecipesParams {
  userId: string | undefined;
  page?: number;
  sort?: { field: string; direction: string };
  filter?: string;
  searchTerm?: string;
}

export interface RecipeBasics {
  id: string;
  title?: string;
  description?: string;
  imageFile?: File | null;
  note?: string;
  userId?: string;
  imageUrl?: string;
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
      `*,recipe_ingredients(ingredients(name,id),quantity),recipe_categories(category:categories(name,id,color))`,
      { count: "exact" }
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
    query = query
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });
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
    userId: recipe.userId,
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
        ingredients: { name: string; id: string };
      }) => ({
        id: ingredients.id,
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

export async function getRecipeById(
  recipeId: string,
  supabase?: SupabaseClient
) {
  if (!supabase) {
    supabase = createClient();
  }

  const { data, error } = await supabase
    .from("recipes")
    .select(
      `*,recipe_ingredients(ingredients(name,id),quantity),recipe_categories(category:categories(name,id,color))`
    )
    .eq("id", recipeId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return null;
  }

  // Get username from profiles
  const userId = data[0].userId;
  let username = "Unknown chef";
  if (userId) {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
    }

    username = profileData?.full_name || "Unknown chef";
  }

  const formattedRecipe = {
    id: data[0].id.toString(),
    userId: data[0].userId,
    username: username,
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
        ingredients: { name: string; id: string };
      }) => ({
        id: ingredients.id,
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

export async function updateRecipeBasics(data: RecipeBasics) {
  const { id, imageFile, userId, ...updateData } = data;
  if (imageFile && userId) {
    updateData.imageUrl = await uploadRecipeImage(imageFile, userId);
  }
  // update the recipe data
  const { error } = await supabase
    .from("recipes")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    throw new Error(error.message);
  }

  return;
}

export async function addIngredientsToRecipe(
  recipeId: string,
  ingredients: Ingredient[]
) {
  // 1. Check for existing ingredients by name
  const { data: existingIngredients, error: searchError } = await supabase
    .from("ingredients")
    .select("id, name")
    .or(ingredients.map((ing) => `name.ilike.${ing.name.trim()}`).join(","));

  if (searchError) throw new Error(searchError.message);

  console.log("existingIngredients", existingIngredients);

  // Create a map of existing ingredients
  const existingIngredientsMap = new Map(
    existingIngredients?.map((ing) => [ing.name.toLowerCase(), ing.id]) ?? []
  );

  // 2. Separate new ingredients that need to be created
  const newIngredients = ingredients.filter(
    (ing) => !existingIngredientsMap.has(ing.name.toLowerCase().trim())
  );

  console.log("newIngredients", newIngredients);

  // 3. Insert new ingredients
  let newIngredientsMap = new Map();
  if (newIngredients.length > 0) {
    const { data: createdIngredients, error: createError } = await supabase
      .from("ingredients")
      .insert(
        newIngredients.map((ing) => ({
          name: ing.name.trim(),
        }))
      )
      .select("id, name");

    if (createError) throw new Error(createError.message);

    // Add newly created ingredients to our map
    newIngredientsMap = new Map(
      createdIngredients?.map((ing) => [ing.name.toLowerCase(), ing.id]) ?? []
    );
  }

  // 4. Create recipe-ingredient associations using both existing and new ingredients
  const recipeIngredients = ingredients.map((ing) => ({
    recipeId,
    ingredientId:
      existingIngredientsMap.get(ing.name.toLowerCase().trim()) ||
      newIngredientsMap.get(ing.name.toLowerCase().trim()),
    quantity: ing.quantity,
  }));

  // 5. Insert recipe-ingredient associations
  const { error: associationError } = await supabase
    .from("recipe_ingredients")
    .insert(recipeIngredients);

  if (associationError) throw new Error(associationError.message);
}

export async function deleteIngredientsFromRecipe(
  recipeId: string,
  ingredientIds: string[]
) {
  const { error } = await supabase
    .from("recipe_ingredients")
    .delete()
    .in("ingredientId", ingredientIds)
    .eq("recipeId", recipeId);

  if (error) throw new Error(error.message);
}

export async function updateIngredientQuantities(
  recipeId: string,
  ingredients: Ingredient[]
) {
  // TODO:update ingredient name
  const updates = ingredients.map((ing) =>
    supabase
      .from("recipe_ingredients")
      .update({ quantity: ing.quantity })
      .eq("recipeId", recipeId)
      .eq("ingredientId", ing.id)
  );

  const results = await Promise.all(updates);

  results.forEach(({ error }) => {
    if (error) throw new Error(error.message);
  });
}

export async function updateRecipeSteps(recipeId: string, steps: string[]) {
  const { error } = await supabase
    .from("recipes")
    .update({ steps })
    .eq("id", recipeId);

  if (error) throw new Error(error.message);
}

export async function addRecipe(recipeData: RecipeAddFormValues) {
  if (!recipeData.userId) {
    throw new Error("User ID is required");
  }

  // Handle image upload if provided
  let imageUrl = recipeData.imageUrl || "/default-recipe.png";
  if (recipeData.imageFile) {
    imageUrl = await uploadRecipeImage(recipeData.imageFile, recipeData.userId);
  }

  // Extract ingredients for later processing
  const ingredients = recipeData.ingredients || [];
  const steps = recipeData.steps || [];

  // Prepare recipe data
  const recipeBasics = {
    title: recipeData.title,
    description: recipeData.description,
    userId: recipeData.userId,
    note: recipeData.note,
    tried: recipeData.tried || false,
  };

  // Insert the recipe
  const { data: newRecipe, error: recipeError } = await supabase
    .from("recipes")
    .insert([
      {
        ...recipeBasics,
        imageUrl: imageUrl,
        steps: steps
          .filter(
            (step: { id: string; value: string }) => step.value.trim() !== ""
          )
          .map((step) => step.value), // Filter out empty steps and return only string array
        created_at: new Date().toISOString(),
      },
    ])
    .select("id")
    .single();

  if (recipeError) {
    console.error("Error creating recipe:", recipeError);
    throw new Error(recipeError.message);
  }

  // Handle ingredients if provided
  if (ingredients.length > 0) {
    try {
      await addIngredientsToRecipe(
        newRecipe.id,
        ingredients.filter(
          (ing: { name: string; quantity: string }) => ing.name.trim() !== ""
        ) // Filter out empty ingredients
      );
    } catch (error) {
      console.error("Error adding ingredients:", error);
      // If ingredients fail, delete the recipe to avoid orphaned data
      await supabase.from("recipes").delete().eq("id", newRecipe.id);
      throw error;
    }
  }

  return newRecipe.id;
}

export async function toggleTried({
  tried,
  id,
}: {
  tried: boolean;
  id: string;
}) {
  const { data, error } = await supabase
    .from("recipes")
    .update({ tried })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error("Update tried status error:", error);
    throw new Error(error.message);
  }
  return data;
}

export async function uploadRecipeImage(
  imageFile: File,
  userId: string
): Promise<string> {
  if (!imageFile) {
    return "/default-recipe.png";
  }

  // Generate a unique filename
  const fileName = `recipe-${userId}-${Date.now()}`;

  // Upload the image to Supabase storage
  const { error: storageError } = await supabase.storage
    .from("recipe_images")
    .upload(fileName, imageFile);

  if (storageError) throw new Error(storageError.message);

  // Generate the public URL for the uploaded image
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/recipe_images/${fileName}`;
}
