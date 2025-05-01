export interface AIRecipeFormValues {
  ingredients: string;
  cuisine?: string;
  dietaryNeeds?: string;
  note?: string;
}

export interface APIError extends Error {
  status: number;
  data?: { message: string; limit?: number; used?: number; remaining?: number };
}

export async function generateAIRecipe(userPreferences: AIRecipeFormValues) {
  // Format preferences as a string for the API
  const preferences = `
     Ingredients: ${userPreferences.ingredients},
     ${userPreferences.cuisine ? `Cuisine: ${userPreferences.cuisine},` : ""}
     ${
       userPreferences.dietaryNeeds
         ? `Dietary Needs: ${userPreferences.dietaryNeeds},`
         : ""
     }
     ${userPreferences.note ? `Additional Notes: ${userPreferences.note}` : ""}
   `.trim();

  const response = await fetch("/api/ai-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ preferences }),
  });

  const data = await response.json();

  // Check specific status codes
  if (response.status === 429) {
    const error = new Error(
      "You've reached the limit for AI recipe generation (3 per session)."
    ) as APIError;
    error.status = 429;
    error.data = data;
    throw error;
  } else if (!response.ok) {
    const error = new Error(
      `Failed to generate recipe: ${response.statusText}`
    ) as APIError;
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
