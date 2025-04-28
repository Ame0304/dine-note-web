export interface AIRecipeFormValues {
  ingredients: string;
  cuisine?: string;
  dietaryNeeds?: string;
  note?: string;
}

export async function generateAIRecipe(userPreferences: AIRecipeFormValues) {
  try {
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

    if (!response.ok) {
      throw new Error(`Failed to generate recipe:${response.statusText}`);
    }

    const { recipe } = await response.json();
    return recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe");
  }
}
