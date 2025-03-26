import { UseFormRegister, FieldArrayWithId } from "react-hook-form";
import Button from "../Button";
import IngredientFormRow from "../IngredientFormRow";

// Generic interface for any form that includes ingredients
export interface FormWithIngredients {
  ingredients: Array<{ id?: string; name: string; quantity: string }>;
}

interface IngredientsFieldsetProps<T extends FormWithIngredients> {
  register: UseFormRegister<T>;
  fields: FieldArrayWithId<T>[];
  append: (value: { name: string; quantity: string }) => void;
  remove: (index: number) => void;
  insert: (
    index: number,
    value: { id?: string; name: string; quantity: string }
  ) => void;
  showSaveButton?: boolean;
  onSave?: () => void;
}

export default function IngredientsFieldset<T extends FormWithIngredients>({
  register,
  fields,
  append,
  remove,
  insert,
  showSaveButton = false,
  onSave,
}: IngredientsFieldsetProps<T>) {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        {fields.length !== 0 && (
          <div className="flex flex-col justify-center items-center">
            {fields.map((field, index) => (
              <IngredientFormRow
                key={field.id}
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
      <div
        className={`flex ${
          showSaveButton ? "justify-between" : "justify-start"
        } w-full`}
      >
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={() => append({ name: "", quantity: "" })}
        >
          Add Ingredient
        </Button>

        {showSaveButton && onSave && (
          <Button type="button" onClick={onSave}>
            Save Ingredients
          </Button>
        )}
      </div>
    </div>
  );
}
