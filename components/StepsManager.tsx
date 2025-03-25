import { useFieldArray, useForm } from "react-hook-form";
import Button from "./Button";
import StepFormRow from "./StepFormRow";

export interface Step {
  id: string;
  value: string;
}

interface StepsManagerProps {
  recipeId: string;
  onClose: () => void;
  initialSteps: string[];
}

export interface StepsFormValues {
  steps: Step[];
}

export default function StepsManager({
  recipeId,
  onClose,
  initialSteps = [],
}: StepsManagerProps) {
  console.log(initialSteps);
  const { control, register, handleSubmit } = useForm<StepsFormValues>({
    defaultValues: {
      steps: initialSteps.map((step, index) => ({
        id: String(index),
        value: step,
      })),
    },
  });

  const { fields, append, remove, insert } = useFieldArray<StepsFormValues>({
    control,
    name: "steps",
  });

  const onSubmit = (data: StepsFormValues) => {
    console.log(recipeId, data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
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

        <Button type="submit">Save Steps</Button>
      </div>
    </form>
  );
}
