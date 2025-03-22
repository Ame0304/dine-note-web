import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "./Button";
import RecipeFormComplexRow from "./IngredientFormRow";

interface StepsManagerProps {
  name: string; // Field name for steps in the parent form
}

export default function StepsManager({ name }: StepsManagerProps) {
  const { control, register } = useFormContext(); // Access the parent form context
  const { fields, insert, remove, append } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="flex flex-col space-y-4 justify-center items-start">
      {fields.length === 0 ? (
        <Button variant="outline" size="small" onClick={() => append("")}>
          Add Step
        </Button>
      ) : (
        <div className="flex flex-col justify-center items-end w-full">
          {fields.map((field, index) => (
            <RecipeFormComplexRow
              key={field.id}
              name={name}
              index={index}
              fieldId={field.id}
              register={register}
              insert={insert}
              remove={remove}
              type="step"
            />
          ))}
          <Button>Save</Button>
        </div>
      )}
    </div>
  );
}
