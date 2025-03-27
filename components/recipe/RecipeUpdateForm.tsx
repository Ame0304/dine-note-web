import Button from "@/components/Button";
import RecipeFormRow from "./RecipeFormRow";
import RecipeFormInput from "./RecipeFormInput";
import RecipeFormTextarea from "./RecipeFormTextarea";
import ExpandableSection from "../ExpandableSection";
import { Recipe } from "@/lib/services/recipeService";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import useUpdateRecipeBasics from "@/hooks/recipes/useUpdateRecipeBasics";
import IngredientsManager from "@/components/recipe/IngredientsManager";
import StepsManager from "./StepsManager";
import ImageUploadField from "@/components/ImageUploadField";
import RecipeFormLayout from "./RecipeFormLayout";

interface RecipeUpdateFormProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

interface RecipeBasicsFormValues {
  id: string;
  title: string;
  description: string;
  imageFile?: File | null;
  imageUrl: string;
  note: string;
  userId: string;
}

export default function RecipeUpdateForm({
  isOpen,
  onClose,
  recipe,
}: RecipeUpdateFormProps) {
  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<RecipeBasicsFormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "/default-recipe.png",
      note: "",
    },
  });

  const { updateRecipeBasics, isUpdating } = useUpdateRecipeBasics();

  const imageUrl = watch("imageUrl"); // watch to show preview

  // Initialize form with recipe data if provided
  useEffect(() => {
    if (recipe) {
      // Reset form with recipe data
      reset({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description || "",
        imageUrl: recipe.imageUrl || "/default-recipe.png",
        note: recipe.note || "",
        userId: recipe.userId,
      });
    }
  }, [recipe, reset, isOpen]);

  const onSubmit: SubmitHandler<RecipeBasicsFormValues> = (data) => {
    if (!recipe?.id) return;
    console.log(data);

    // Update recipe details
    updateRecipeBasics(data);

    onClose();
  };

  return (
    <RecipeFormLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Update Recipe"
      footerContent={
        <Button onClick={onClose} variant="outline" disabled={isUpdating}>
          Cancel
        </Button>
      }
    >
      {/* Basic info form */}
      <form onSubmit={handleSubmit(onSubmit)} id="recipe-basic">
        <div className="mt-4 px-4 py-5 rounded-2xl border-4 border-accent-200 bg-white/80 flex flex-col gap-3">
          {/* Image */}
          <ImageUploadField
            imageUrl={imageUrl}
            onImageChange={(file) => {
              setValue("imageFile", file);
              const previewUrl = URL.createObjectURL(file);
              setValue("imageUrl", previewUrl);
            }}
          />
          {/* Title */}
          <RecipeFormRow label="Title" error={errors.title?.message}>
            <RecipeFormInput
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
            />
          </RecipeFormRow>

          {/* Description */}
          <RecipeFormRow label="Description">
            <RecipeFormTextarea
              id="description"
              placeholder="Give your recipe a description"
              {...register("description")}
            />
          </RecipeFormRow>

          <RecipeFormRow label="Note">
            <RecipeFormTextarea
              id="note"
              placeholder="Type your chef's note here"
              {...register("note")}
            />
          </RecipeFormRow>
          <div className="pt-4 flex justify-end">
            <Button type="submit" form="recipe-basic" disabled={isUpdating}>
              Save
            </Button>
          </div>
        </div>
      </form>
      {/* Ingredients Form */}
      <ExpandableSection icon="🥔" title="Ingredients" isEdit={true}>
        <IngredientsManager
          recipeId={recipe?.id || ""}
          initialIngredients={recipe?.ingredients || []}
          onClose={onClose}
        />
      </ExpandableSection>
      <ExpandableSection icon="🔪" title="Steps" isEdit={true}>
        <StepsManager
          recipeId={recipe?.id || ""}
          initialSteps={recipe?.steps || []}
          onClose={onClose}
        />
      </ExpandableSection>
    </RecipeFormLayout>
  );
}
