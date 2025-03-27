import { UseFormRegister, FieldArrayWithId } from "react-hook-form";
import Button from "../Button";
import StepFormRow from "./StepFormRow";

// Generic interface for any form that includes steps
export interface FormWithSteps {
  steps: Array<{ id: string; value: string }>;
}

interface StepsFieldsetProps<T extends FormWithSteps> {
  register: UseFormRegister<T>;
  fields: FieldArrayWithId<T>[];
  append: (value: { id: string; value: string }) => void;
  remove: (index: number) => void;
  insert: (index: number, value: { id: string; value: string }) => void;
  showSaveButton?: boolean;
  onSave?: () => void;
  isUpdating?: boolean;
}

export default function StepsFieldset<T extends FormWithSteps>({
  register,
  fields,
  append,
  remove,
  insert,
  showSaveButton = false,
  onSave,
  isUpdating,
}: StepsFieldsetProps<T>) {
  return (
    <div className="w-full flex flex-col">
      <div>
        {fields.length !== 0 && (
          <div className="">
            {fields.map((field, index) => (
              <StepFormRow
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
      <div className="flex justify-between items-center w-full">
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={() => append({ id: String(fields.length), value: "" })}
        >
          Add Steps
        </Button>

        {showSaveButton && onSave && (
          <Button type="button" onClick={onSave} disabled={isUpdating}>
            Save Steps
          </Button>
        )}
      </div>
    </div>
  );
}
