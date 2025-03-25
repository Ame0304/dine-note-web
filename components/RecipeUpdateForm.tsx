import { Lexend } from "next/font/google";
import { Dialog, DialogPanel } from "@headlessui/react";
import Button from "./Button";
import Heading from "./Heading";
import RecipeFormRow from "./RecipeFormRow";
import RecipeFormInput from "./RecipeFormInput";
import RecipeFormTextarea from "./RecipeFormTextarea";
import ExpandableSection from "./ExpandableSection";
import { Recipe } from "../lib/services/recipeService";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import useUpdateRecipeBasics from "@/hooks/recipes/useUpdateRecipeBasics";
import IngredientsManager from "./IngredientsManager";
import StepsManager from "./StepsManager";
import ImageUploadField from "./ImageUploadField";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={`relative z-50 ${lexend.className}`}
    >
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center text-primary-100">
        <DialogPanel className="w-full md:w-1/2 bg-primary-950 rounded-2xl shadow-lg shadow-primary-900 p-6 mx-auto  border-4 border-accent-200 transform transition-all max-h-[90vh] overflow-y-auto scrollbar-hide">
          {/* Hidden userId field */}
          <input type="hidden" {...register("userId")} />
          {/* Title */}
          <div className="text-center">
            <Heading level="h3" styled={true} className="text-accent-200">
              {recipe ? "Update Recipe" : "Create Recipe"}
            </Heading>
          </div>
          {/* Basic info form */}
          <form onSubmit={handleSubmit(onSubmit)} id="recipe-form">
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
                <Button type="submit" form="recipe-form" disabled={isUpdating}>
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
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline" disabled={isUpdating}>
              Cancel
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
