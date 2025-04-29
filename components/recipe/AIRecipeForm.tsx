import { useState, useEffect } from "react";
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
import Loading from "../Loading";

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
  const [error, setError] = useState<string | null>(null);
  const [generatedRecipe, setGeneratedRecipe] =
    useState<GeneratedRecipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);

  // Handle animation when recipe is generated
  useEffect(() => {
    if (generatedRecipe) {
      const timer = setTimeout(() => {
        setShowRecipe(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [generatedRecipe, isGenerating]);

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
    setShowRecipe(true);
    setError(null);

    try {
      const recipe = await generateAIRecipe(data);
      // Set the generated recipe in state
      setGeneratedRecipe(recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
      setError("Opps! Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    const newData = getValues(); // Get current form values
    setIsGenerating(true);
    setShowRecipe(true);

    setTimeout(() => {
      generateAIRecipe(newData)
        .then((recipe) => {
          setGeneratedRecipe(recipe);
        })
        .catch((error) => {
          console.error("Error regenerating recipe:", error);
          setError("Opps! Something went wrong. Please try again.");
          setIsGenerating(false);
        })
        .finally(() => {
          setIsGenerating(false);
        });
    }, 300);
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

  console.log("Generated Recipe:", generatedRecipe); // TODO:Delete

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
          generatedRecipe || isGenerating ? "md:grid-cols-3" : ""
        } transition-all duration-300 ease-in-out`}
      >
        {/* Left side: Form inputs */}
        <div
          className={`mt-4 p-4 rounded-2xl bg-white/80 shadow-lg flex flex-col justify-between ${
            showRecipe ? "md:transform md:scale-95 md:opacity-90" : ""
          } transition-all duration-300`}
        >
          <div>
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
            <FormRow
              label="Note"
              error={errors.dietaryNeeds?.message}
              id="note"
            >
              <Input
                type="text"
                id="note"
                placeholder="Anything else you'd like to add?"
                {...register("note")}
                disabled={isGenerating}
              />
            </FormRow>
          </div>

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
        {/* Right side: Generated recipe */}
        <div
          className={`max-h-[500px] overflow-y-auto scrollbar-hide mt-4 p-4 rounded-2xl bg-white/80 shadow-lg flex flex-col md:col-span-2 
    transition-all duration-500 ease-in-out
    ${
      showRecipe
        ? "opacity-100 transform translate-x-0"
        : "opacity-0 transform translate-x-10 absolute -right-full"
    }
  `}
        >
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loading
                size="large"
                message="Our chef is cooking up a recipe..."
              />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <p className="text-red-500 font-medium">{error}</p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={handleSubmit(onSubmit)}
              >
                Try Again
              </Button>
            </div>
          ) : (
            generatedRecipe && (
              <div className="animate-fadeIn">
                <h3 className="text-lg font-bold mb-2">
                  🍜 {generatedRecipe.title}
                </h3>
                <p className="mb-4">{generatedRecipe.description}</p>

                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">🥔 Ingredients</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {generatedRecipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="opacity-0" // Start with opacity 0
                        style={{
                          animation: `fadeSlideIn 0.5s ease-out forwards ${
                            index * 100
                          }ms`,
                        }}
                      >
                        <span className="font-medium">{ingredient.name}</span> -{" "}
                        {ingredient.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-md font-semibold mb-2">🥘 Steps</h4>
                  <ol className="list-decimal pl-5 text-sm">
                    {generatedRecipe.steps.map((step, index) => (
                      <li
                        key={index}
                        className="mb-1 opacity-0" // Start with opacity 0
                        style={{
                          animation: `fadeSlideIn 0.5s ease-out forwards ${
                            (index + generatedRecipe.ingredients.length) * 100
                          }ms`,
                        }}
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </RecipeFormLayout>
  );
}
