import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "./Button";
import RecipeFormComplexRow from "./RecipeFormComplexRow";

interface StepsManagerProps {
  name: string; // Field name for steps in the parent form
}

export default function StepsManager({ name }: StepsManagerProps) {
  const { control, register } = useFormContext(); // Access the parent form context
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      {fields.length === 0 ? (
        <Button variant="outline" size="small" onClick={() => append("")}>
          Add Step
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
            type="step"
          />
        ))
      )}
    </div>
  );
}
