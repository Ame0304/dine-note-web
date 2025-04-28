import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { generateAIRecipe, AIRecipeFormValues } from "@/lib/services/aiService";
import { useUser } from "@/context/UserContext";

import Button from "@/components/Button";
import RecipeFormLayout from "@/components/recipe/RecipeFormLayout";
import {
  SparklesIcon,
  ArrowPathIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import FormRow from "../FormRow";
import Input from "../Input";
import useAddRecipe from "@/hooks/recipes/useAddRecipe";

interface AIRecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: Array<{ name: string; quantity: string }>;
  steps: string[];
}

export default function AIRecipeForm({ isOpen, onClose }: AIRecipeFormProps) {
  const { user } = useUser();
  const { addRecipe, isAdding } = useAddRecipe();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] =
    useState<GeneratedRecipe | null>(null);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<AIRecipeFormValues>({
    defaultValues: {
      ingredients: "",
      cuisine: "",
      dietaryNeeds: "",
      note: "",
    },
  });

  const onSubmit: SubmitHandler<AIRecipeFormValues> = async (data) => {
    setIsGenerating(true);

    try {
      const recipe = await generateAIRecipe(data);
      // Set the generated recipe in state
      setGeneratedRecipe(recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
      // TODO:add some error handling UI here
    } finally {
      setIsGenerating(false);
    }
  };

  // TODO: Test this function
  const handleRegenerate = () => {
    const newData = getValues(); // Get current form values
    setIsGenerating(true);

    generateAIRecipe(newData)
      .then((recipe) => {
        setGeneratedRecipe(recipe);
      })
      .catch((error) => {
        console.error("Error regenerating recipe:", error);
      })
      .finally(() => {
        setIsGenerating(false);
      });
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

  console.log("Generated Recipe:", generatedRecipe);

  return (
    <RecipeFormLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Generate AI Recipe ✨"
      width={`${generatedRecipe ? "lg:w-2/3" : "lg:w-1/3"} `}
      footerContent={
        <div className="flex flex-end gap-2">
          <Button onClick={onClose} variant="outline" disabled={isGenerating}>
            Cancel
          </Button>
          {!generatedRecipe ? (
            <Button onClick={handleSubmit(onSubmit)} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Recipe"}
              <SparklesIcon className="size-5 stroke-[3]" />
            </Button>
          ) : (
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
          generatedRecipe ? "md:grid-cols-3" : ""
        }`}
      >
        {/* Left side: Form inputs */}
        <div className="mt-4 p-4 rounded-2xl bg-white/80 shadow-lg flex flex-col">
          {/* Ingredients */}
          <FormRow
            label="Ingredients you'd like to use"
            error={errors.ingredients?.message}
            id="ingredients"
          >
            <Input
              type="text"
              id="ingredients"
              placeholder="e.g. chicken, rice, bell peppers"
              {...register("ingredients", {
                required: "Please specify some ingredients",
              })}
              disabled={isGenerating}
            />
          </FormRow>

          {/* Cuisine */}
          <FormRow
            label="Preferred Cuisine"
            error={errors.cuisine?.message}
            id="cuisine"
          >
            <Input
              type="text"
              id="cuisine"
              placeholder="e.g. Italian, Chinese, Mexican"
              {...register("cuisine")}
              disabled={isGenerating}
            />
          </FormRow>

          {/* Dietary Needs */}
          <FormRow
            label="Dietary Needs"
            error={errors.dietaryNeeds?.message}
            id="dietaryNeeds"
          >
            <Input
              type="text"
              id="dietaryNeeds"
              placeholder="e.g. vegetarian, high-protein, low-carb"
              {...register("dietaryNeeds")}
              disabled={isGenerating}
            />
          </FormRow>

          {/* Note */}
          <FormRow label="Note" error={errors.dietaryNeeds?.message} id="note">
            <Input
              type="text"
              id="note"
              placeholder="Anything else you'd like to add?"
              {...register("note")}
              disabled={isGenerating}
            />
          </FormRow>

          {generatedRecipe && (
            <Button
              className="mt-4"
              onClick={handleRegenerate}
              variant="outline"
              disabled={isGenerating || isAdding}
            >
              Regenerate
              <ArrowPathIcon className="size-5 stroke-[3]" />
            </Button>
          )}
        </div>
        {generatedRecipe && (
          <div className="mt-4 p-4 rounded-2xl bg-white/80 shadow-lg flex flex-col md:col-span-2">
            <h3 className="text-lg font-bold mb-2">
              🍜 {generatedRecipe.title}
            </h3>
            <p className="text-gray-700 mb-4">{generatedRecipe.description}</p>

            <div className="mb-4">
              <h4 className="text-md font-semibold mb-2">🥔 Ingredients</h4>
              <ul className="list-disc pl-5 text-sm">
                {generatedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-2">🥘 Steps</h4>
              <ol className="list-decimal pl-5 text-sm">
                {generatedRecipe.steps.map((step, index) => (
                  <li key={index} className="mb-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </RecipeFormLayout>
  );
}
