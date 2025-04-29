import { useForm, SubmitHandler } from "react-hook-form";
import { AIRecipeFormValues } from "@/lib/services/aiService";
import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ArrowPathIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface AIInputFormProps {
  onSubmit: SubmitHandler<AIRecipeFormValues>;
  isGenerating: boolean;
  isAdding: boolean;
  recipeGenerated: boolean;
  className?: string;
}

export default function AIInputForm({
  onSubmit,
  isGenerating,
  isAdding,
  recipeGenerated,
  className,
}: AIInputFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AIRecipeFormValues>({
    defaultValues: {
      ingredients: "",
      cuisine: "",
      dietaryNeeds: "",
      note: "",
    },
  });

  return (
    <div
      className={`${className} mt-4 p-4 rounded-2xl bg-white/80 shadow-lg flex flex-col justify-between`}
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
        <FormRow label="Note" error={errors.dietaryNeeds?.message} id="note">
          <Input
            type="text"
            id="note"
            placeholder="Anything else you'd like to add?"
            {...register("note")}
            disabled={isGenerating}
          />
        </FormRow>
      </div>

      <Button
        className="mt-4"
        onClick={handleSubmit(onSubmit)}
        disabled={isGenerating || isAdding}
        variant={recipeGenerated ? "outline" : "primary"}
      >
        {isGenerating
          ? "Generating..."
          : recipeGenerated
          ? "Regenerate"
          : "Generate Recipe"}
        {recipeGenerated ? (
          <ArrowPathIcon className="size-5 stroke-[3]" />
        ) : (
          <SparklesIcon className="size-5 stroke-[3]" />
        )}
      </Button>
    </div>
  );
}
