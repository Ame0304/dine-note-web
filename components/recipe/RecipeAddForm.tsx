import Button from "@/components/Button";
import ImageUploadField from "@/components/ImageUploadField";
import RecipeFormLayout from "@/components/recipe/RecipeFormLayout";
import RecipeFormRow from "@/components/recipe/RecipeFormRow";
import RecipeFormInput from "@/components/recipe/RecipeFormInput";
import RecipeFormTextarea from "@/components/recipe/RecipeFormTextarea";
import ExpandableSection from "@/components/ExpandableSection";
import IngredientsFieldset from "./IngredientsFieldset";
import StepsFieldset from "./StepsFieldset";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import useAddRecipe from "@/hooks/recipes/useAddRecipe";

interface RecipeAddFormProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export interface RecipeAddFormValues {
  title: string;
  description?: string;
  imageFile?: File | null;
  imageUrl: string;
  tried?: boolean;
  categories?: Array<{ name: string; id: string; color: string }>;
  ingredients: Array<{ id?: string; name: string; quantity: string }>;
  steps: Array<{ id: string; value: string }>; // Ensure steps is always defined
  note?: string;
  userId: string;
}

export default function RecipeAddForm({
  isOpen,
  onClose,
  userId,
}: RecipeAddFormProps) {
  const { addRecipe, isAdding } = useAddRecipe();

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<RecipeAddFormValues>({
    defaultValues: {
      title: "",
    },
  });

  // UseFieldArray for ingredients
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "ingredients",
  });

  // UseFieldArray for steps
  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
    insert: insertStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const imageUrl = watch("imageUrl"); // watch to show preview

  const onSubmit: SubmitHandler<RecipeAddFormValues> = (data) => {
    console.log(data);
    addRecipe(data);
    onClose();
  };

  return (
    <RecipeFormLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Recipe"
      footerContent={
        <div className="flex flex-end gap-2">
          <Button onClick={onClose} variant="outline" disabled={isAdding}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isAdding}>
            Add new recipe
          </Button>
        </div>
      }
    >
      <div className="mt-4 px-4 py-5 rounded-2xl border-4 border-accent-200 bg-white/50 flex flex-col gap-3">
        <input hidden {...register("userId")} value={userId} />
        {/* Image */}
        <ImageUploadField
          imageUrl={imageUrl || "/default-recipe.png"}
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
      </div>
      {/* Ingredients Form*/}
      <ExpandableSection icon="🥔" title="Ingredients" isEdit={true}>
        <IngredientsFieldset<RecipeAddFormValues>
          register={register}
          fields={fields}
          append={append}
          remove={remove}
          insert={insert}
        />
      </ExpandableSection>
      <ExpandableSection icon="🔪" title="Steps" isEdit={true}>
        <StepsFieldset<RecipeAddFormValues>
          register={register}
          fields={stepFields}
          append={appendStep}
          remove={removeStep}
          insert={insertStep}
        />
      </ExpandableSection>
    </RecipeFormLayout>
  );
}
