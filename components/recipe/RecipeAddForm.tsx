import Button from "@/components/Button";
import RecipeFormLayout from "@/components/RecipeFormLayout";
import ImageUploadField from "@/components/ImageUploadField";
import RecipeFormRow from "@/components/RecipeFormRow";
import RecipeFormInput from "@/components/RecipeFormInput";
import RecipeFormTextarea from "@/components/RecipeFormTextarea";
import ExpandableSection from "@/components/ExpandableSection";
import IngredientsManager from "@/components/IngredientsManager";
import StepsManager from "@/components/StepsManager";
import { useForm, SubmitHandler } from "react-hook-form";

interface RecipeUpdateFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RecipeAddFormValues {
  title: string;
  description?: string;
  imageFile?: File | null;
  imageUrl: string;
  tried?: boolean;
  categories?: Array<{ name: string; id: string; color: string }>;
  ingredients?: Array<{ id: string; name: string; quantity: string }>;
  note?: string;
  steps?: Array<string>;
  userId: string;
}

export default function RecipeAddForm({
  isOpen,
  onClose,
}: RecipeUpdateFormProps) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<RecipeAddFormValues>({
    defaultValues: {
      title: "",
    },
  });

  const imageUrl = watch("imageUrl"); // watch to show preview

  const onSubmit: SubmitHandler<RecipeAddFormValues> = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <RecipeFormLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Update Recipe"
      footerContent={
        <Button
          onClick={onClose}
          variant="outline"
          // disabled={isUpdating}
        >
          Cancel
        </Button>
      }
    >
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
        </div>
        {/* Ingredients Form */}
        <ExpandableSection icon="🥔" title="Ingredients" isEdit={true}>
          <IngredientsManager
            recipeId={""}
            initialIngredients={[]}
            onClose={onClose}
          />
        </ExpandableSection>
        <ExpandableSection icon="🔪" title="Steps" isEdit={true}>
          <StepsManager recipeId={""} initialSteps={[]} onClose={onClose} />
        </ExpandableSection>
      </form>
    </RecipeFormLayout>
  );
}
