import { Lexend } from "next/font/google";
import { Dialog, DialogPanel } from "@headlessui/react";
import Button from "./Button";
import Heading from "./Heading";
import RecipeFormRow from "./RecipeFormRow";
import RecipeFormInput from "./RecipeFormInput";
import Image from "next/image";
import RecipeFormTextarea from "./RecipeFormTextarea";
import FileInput from "./FileInput";
// import ExpandableSection from "./ExpandableSection";
// import RecipeFormItemRow from "./RecipeFormItemRow";
import { Recipe } from "../lib/services/recipeService";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import useUpdateRecipeDetails from "@/hooks/recipes/useUpdateRecipeDetails";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

interface RecipeFormValues {
  id: string;
  title: string;
  description: string;
  imageFile?: File | null;
  imageUrl: string;
  ingredients: Array<{ name: string; quantity: string }>;
  steps: Array<{ step: number; instruction: string }>;
  note: string;
  userId: string;
}

export default function RecipeFormModal({
  isOpen,
  onClose,
  recipe,
}: RecipeFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RecipeFormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "/default-recipe.png",
      ingredients: [],
      steps: [],
      note: "",
    },
  });

  const { updateRecipeDetails, isUpdating } = useUpdateRecipeDetails();

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
        ingredients: recipe.ingredients || [],
        steps: recipe.steps || [],
        note: recipe.note || "",
        userId: recipe.userId,
      });
    } else {
      // Reset to default values
      reset({
        title: "",
        description: "",
        imageUrl: "/default-recipe.png",
        ingredients: [],
        steps: [],
        note: "",
      });
    }
  }, [recipe, reset, isOpen]);

  const onSubmit: SubmitHandler<RecipeFormValues> = (data) => {
    console.log(data);

    // Update recipe details
    updateRecipeDetails(data);

    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={`relative z-50 ${lexend.className}`}
    >
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center text-primary-100">
        <DialogPanel className="w-full md:w-1/2 bg-primary-950 rounded-2xl shadow-lg shadow-primary-900 p-6 mx-auto  border-4 border-accent-200 transform transition-all max-h-[90vh] overflow-y-auto scrollbar-hide">
          {/* Hidden userId field */}
          <input type="hidden" {...register("userId")} />
          {/*Title */}
          <div className="text-center">
            <Heading level="h3" styled={true} className="text-accent-200">
              {recipe ? "Update Recipe" : "Create Recipe"}
            </Heading>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} id="recipe-form">
            <div className="mt-4 px-4 py-5 rounded-2xl border-4 border-accent-200 bg-white/80 flex flex-col gap-3">
              {/* Image */}
              <div className="ml-2 mb-3 flex items-center justify-start gap-5">
                <label htmlFor="imageUrl" className="text-lg font-semibold">
                  Recipe image
                </label>
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-200 shadow-lg shadow-primary-900">
                  <Image
                    src={imageUrl}
                    alt={"Recipe image"}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <FileInput
                  accept="image/*"
                  id="imageUrl"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      // Store the file object for upload
                      setValue("imageFile", file);
                      // Create URL for preview only
                      const previewUrl = URL.createObjectURL(file);
                      setValue("imageUrl", previewUrl);
                    }
                  }}
                >
                  Change Image
                </FileInput>
              </div>

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

              {/* Ingredients */}
              {/* <ExpandableSection icon="🥔" title="Ingredients" isEdit={true}>
                {formData?.ingredients ? (
                  formData.ingredients.map((ingredient) => (
                    <RecipeFormItemRow
                      id={ingredient.name}
                      label={ingredient.name}
                      value={ingredient.quantity}
                      key={ingredient.name}
                      onAdd={() => console.log("add")}
                      onDelete={() => console.log("delete")}
                    />
                  ))
                ) : (
                  <RecipeFormItemRow
                    id={"new"}
                    label={"New Ingredient"}
                    value={""}
                    placeholder="Add an ingredient"
                    onAdd={() => console.log("add")}
                    onDelete={() => console.log("delete")}
                  />
                )}
              </ExpandableSection> */}

              {/* Steps */}
              {/* <ExpandableSection icon="🔪" title="Steps" isEdit={true}>
                {formData?.steps ? (
                  formData.steps.map((step) => (
                    <RecipeFormItemRow
                      id={String(step.step)}
                      label={String(step.step)}
                      value={step.instruction}
                      key={step.step}
                      onAdd={() => console.log("add")}
                      onDelete={() => console.log("delete")}
                    />
                  ))
                ) : (
                  <RecipeFormItemRow
                    id={"1"}
                    label={"1"}
                    value={""}
                    placeholder="Add a step"
                    onAdd={() => console.log("add")}
                    onDelete={() => console.log("delete")}
                  />
                )}
              </ExpandableSection> */}

              <RecipeFormRow label="Note">
                <RecipeFormTextarea
                  id="note"
                  placeholder="Type your chef's note here"
                  {...register("note")}
                />
              </RecipeFormRow>
            </div>
          </form>
          <div className="pt-4 flex gap-4 justify-end">
            <Button onClick={onClose} variant="outline" disabled={isUpdating}>
              Cancel
            </Button>
            <Button type="submit" form="recipe-form" disabled={isUpdating}>
              Save
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
