import { useFieldArray, useForm } from "react-hook-form";
import Button from "./Button";
import IngredientFormRow from "./IngredientFormRow";
import { useUpdateRecipeIngredients } from "@/hooks/recipes/useUpdateRecipeIngredients";

export interface Ingredient {
  id?: string;
  name: string;
  quantity: string;
}

interface IngredientsManagerProps {
  name: string;
  recipeId: string;
  initialIngredients: Ingredient[] | [];
  onClose: () => void;
}

export interface IngredientsFormValues {
  ingredients: Ingredient[];
}

export default function IngredientsManager({
  name,
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
      console.log("Added Ingredients", addedIngredients, "Recipe ID", recipeId);
      addMutation.mutate(addedIngredients);
    }

    if (deletedIngredients.length > 0) {
      console.log(
        "Deleted Ingredients",
        deletedIngredients,
        "Recipe ID",
        recipeId
      );
      deleteMutation.mutate(deletedIngredients);
    }

    if (updatedIngredients.length > 0) {
      console.log(
        "Updated Ingredients",
        updatedIngredients,
        "Recipe ID",
        recipeId
      );
      updateMutation.mutate(updatedIngredients);
    }

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 items-end"
    >
      <div>
        {fields.length !== 0 && (
          <div className="flex flex-col justify-center items-center">
            {fields.map((field, index) => (
              <IngredientFormRow
                key={field.id}
                name={name}
                index={index}
                fieldId={field.id}
                register={register}
                insert={insert}
                remove={remove}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={() => append({ name: "", quantity: "" })}
        >
          Add Ingredient
        </Button>

        <Button type="submit">Save Ingredients</Button>
      </div>
    </form>
  );
}
