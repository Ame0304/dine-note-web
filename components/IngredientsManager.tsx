import { useFieldArray, useFormContext } from "react-hook-form";
// import RecipeFormItemRow from "./RecipeFormItemRow";
import Button from "./Button";
import RecipeFormComplexRow from "./RecipeFormComplexRow";

interface IngredientsManagerProps {
  name: string; // Field name for ingredients in the parent form
}

export default function IngredientsManager({ name }: IngredientsManagerProps) {
  const { control, register } = useFormContext(); // Access the parent form context
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      {fields.length === 0 ? (
        <Button
          variant="outline"
          size="small"
          onClick={() => append({ name: "", quantity: "" })}
        >
          Add Ingredient
        </Button>
      ) : (
        fields.map((field, index) => (
          <RecipeFormComplexRow
            key={field.id}
            name={name}
            index={index}
            fieldId={field.id}
            register={register}
            append={append}
            remove={remove}
          />
        ))
      )}
    </div>
  );
}
