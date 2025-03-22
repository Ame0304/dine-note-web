import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "./Button";
import RecipeFormComplexRow from "./RecipeFormComplexRow";

interface IngredientsManagerProps {
  name: string; // Field name for ingredients in the parent form
}

export default function IngredientsManager({ name }: IngredientsManagerProps) {
  const { control, register } = useFormContext(); // Access the parent form context
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="flex flex-col space-y-4 justify-center items-start">
      {fields.length === 0 ? (
        <Button
          variant="outline"
          size="small"
          onClick={() => append({ name: "", quantity: "" })}
        >
          Add Ingredient
        </Button>
      ) : (
        <div className="flex flex-col justify-center items-end">
          {fields.map((field, index) => (
            <RecipeFormComplexRow
              key={field.id}
              name={name}
              index={index}
              fieldId={field.id}
              register={register}
              insert={insert}
              remove={remove}
            />
          ))}
          <Button>Save</Button>
        </div>
      )}
    </div>
  );
}
