import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { generateAIRecipe, AIRecipeFormValues } from "@/lib/services/aiService";
import { useUser } from "@/context/UserContext";

import Button from "@/components/Button";
import RecipeFormLayout from "@/components/recipe/RecipeFormLayout";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import useAddRecipe from "@/hooks/recipes/useAddRecipe";
import AIInputForm from "./AIInputForm";
import AIRecipeDisplay from "./AIRecipeDisplay";

interface AIRecipeBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: Array<{ name: string; quantity: string }>;
  steps: string[];
}

export default function AIRecipeBox({ isOpen, onClose }: AIRecipeBoxProps) {
  const { user } = useUser();
  const { addRecipe, isAdding } = useAddRecipe();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedRecipe, setGeneratedRecipe] =
    useState<GeneratedRecipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [formValues, setFormValues] = useState<AIRecipeFormValues>({
    ingredients: "",
    cuisine: "",
    dietaryNeeds: "",
    note: "",
  });
  const [usage, setUsage] = useState<{
    used: number;
    limit: number;
    remaining: number;
  } | null>(null);

  // Handle animation when recipe is generated
  useEffect(() => {
    if (generatedRecipe) {
      const timer = setTimeout(() => {
        setShowRecipe(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [generatedRecipe, isGenerating]);

  const onSubmit: SubmitHandler<AIRecipeFormValues> = async (data) => {
    setIsGenerating(true);
    setShowRecipe(true);
    setError(null);
    setFormValues(data);

    try {
      const result = await generateAIRecipe(data);
      // Set the generated recipe in state
      setGeneratedRecipe(result.recipe);

      // Store usage data
      if (result.usage) {
        setUsage(result.usage);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Oops! Something went wrong. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToRecipes = () => {
    if (!generatedRecipe || !user?.id) return;

    // Transform AI recipe to match RecipeAddFormValues structure
    const recipeToAdd = {
      title: generatedRecipe.title,
      description: generatedRecipe.description,
      imageUrl: "",
      ingredients: generatedRecipe.ingredients,
      steps: generatedRecipe.steps.map((step, index) => ({
        id: `step-${index}`,
        value: step,
      })),
      userId: user.id,
    };

    addRecipe(recipeToAdd);
    onClose();
  };

  return (
    <RecipeFormLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Generate AI Recipe ✨"
      width={`${
        generatedRecipe || isGenerating ? "lg:w-2/3" : "lg:w-1/3"
      } transition-all duration-300 ease-in-out`}
      footerContent={
        <div className="flex flex-end gap-2">
          <Button onClick={onClose} variant="outline" disabled={isGenerating}>
            Cancel
          </Button>

          {generatedRecipe && (
            <Button
              onClick={handleAddToRecipes}
              disabled={isGenerating || isAdding}
            >
              Add to Recipes
              <DocumentPlusIcon className="size-5 stroke-[3]" />
            </Button>
          )}
        </div>
      }
    >
      <div
        className={`grid grid-cols-1 gap-4 ${
          generatedRecipe || isGenerating ? "md:grid-cols-3" : ""
        } transition-all duration-300 ease-in-out`}
      >
        {/* Left side: Form inputs */}
        <AIInputForm
          onSubmit={onSubmit}
          isGenerating={isGenerating}
          isAdding={isAdding}
          recipeGenerated={!!generatedRecipe}
          className={showRecipe ? "md:transform md:scale-95 md:opacity-90" : ""}
        />
        {/* Right side: Generated recipe */}
        {(showRecipe || isGenerating) && (
          <AIRecipeDisplay
            isGenerating={isGenerating}
            error={error}
            recipe={generatedRecipe}
            onRetry={() => onSubmit(formValues)}
            className={`md:col-span-2 transition-all duration-500 ease-in-out
                ${
                  showRecipe
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-10 absolute -right-full"
                }`}
          />
        )}
        {usage && (
          <div className="text-xs text-gray-400 mt-1">
            Used {usage.used}/{usage.limit} generations this session
          </div>
        )}
      </div>
    </RecipeFormLayout>
  );
}
