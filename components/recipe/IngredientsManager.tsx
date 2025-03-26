import { useFieldArray, useForm } from "react-hook-form";
import { useUpdateRecipeIngredients } from "@/hooks/recipes/useUpdateRecipeIngredients";
import IngredientsFieldset from "./IngredientsFieldset";

export interface Ingredient {
  id?: string;
  name: string;
  quantity: string;
}

interface IngredientsManagerProps {
  recipeId: string;
  initialIngredients: Ingredient[] | [];
  onClose: () => void;
}

export interface IngredientsFormValues {
  ingredients: Ingredient[];
}

export default function IngredientsManager({
  recipeId,
  initialIngredients,
  onClose,
}: IngredientsManagerProps) {
  const { control, register, handleSubmit } = useForm<IngredientsFormValues>({
    defaultValues: {
      ingredients: initialIngredients,
    },
  });

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { addMutation, deleteMutation, updateMutation } =
    useUpdateRecipeIngredients(recipeId);

  const onSubmit = (data: IngredientsFormValues) => {
    const newIngredients = data.ingredients;

    // 1. Identify added ingredients (exist in new but not in original)
    const addedIngredients = newIngredients.filter((ing) => !ing.id);
    // 2. Identify deleted ingredients (exist in original but not in new)
    const deletedIngredients = initialIngredients
      .filter(
        (origIng) => !newIngredients.some((newIng) => newIng.id === origIng.id)
      )
      .map((ing) => ing.id!); // We know that the id is not undefined

    // 3.Extract existing ingredients that need quantity updates
    const updatedIngredients = newIngredients.filter(
      (ing) =>
        ing.id && initialIngredients.some((origIng) => origIng.id === ing.id)
    );

    // Execute the API Calls:
    if (addedIngredients.length > 0) {
      addMutation.mutate(addedIngredients);
    }

    if (deletedIngredients.length > 0) {
      deleteMutation.mutate(deletedIngredients);
    }

    if (updatedIngredients.length > 0) {
      updateMutation.mutate(updatedIngredients);
    }

    onClose();
  };

  return (
    <IngredientsFieldset<IngredientsFormValues>
      register={register}
      fields={fields}
      append={append}
      remove={remove}
      insert={insert}
      showSaveButton={true}
      onSave={handleSubmit(onSubmit)}
    />
  );
}
