import { useFieldArray, useForm } from "react-hook-form";
import useUpdateSteps from "@/hooks/recipes/useUpdateSteps";
import StepsFieldset from "./recipe/StepsFieldset";

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

  const { updateSteps, isUpdating } = useUpdateSteps();

  const onSubmit = (data: StepsFormValues) => {
    const stepsStringArr = data.steps.map((step) => step.value);
    updateSteps({ recipeId, steps: stepsStringArr });

    onClose();
  };

  return (
    <StepsFieldset
      register={register}
      fields={fields}
      append={append}
      remove={remove}
      insert={insert}
      showSaveButton
      onSave={handleSubmit(onSubmit)}
      isUpdating={isUpdating}
    />
  );
}
