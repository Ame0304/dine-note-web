import { useFieldArray, useForm } from "react-hook-form";
import Button from "./Button";
import IngredientFormRow from "./IngredientFormRow";

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

interface IngredientsManagerProps {
  name: string;
  recipeId: string;
  initialIngredients: Ingredient[] | [];
}

export interface IngredientsFormValues {
  ingredients: Ingredient[];
}

export default function IngredientsManager({
  name,
  recipeId,
  initialIngredients,
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

  const onSubmit = (data: IngredientsFormValues) => {
    console.log("recipeId", recipeId, "data:", data);
    // updateRecipeIngredients({
    //   id: recipeId,
    //   ingredients: data.ingredients
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-4 justify-center items-start">
        {fields.length === 0 ? (
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={() =>
              append({ id: crypto.randomUUID(), name: "", quantity: "" })
            }
          >
            Add Ingredient
          </Button>
        ) : (
          <div className="flex flex-col justify-center items-end">
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
            <Button type="submit">Save Ingredients</Button>
          </div>
        )}
      </div>
    </form>
  );
}
