import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { UseFormRegister, Path } from "react-hook-form";
import { Step } from "./StepsManager";
import { FormWithSteps } from "./StepsFieldset";

interface StepFormRowProps<T extends FormWithSteps> {
  index: number;
  fieldId: string;
  register: UseFormRegister<T>;
  insert: (index: number, value: Step) => void;
  remove: (index: number) => void;
}

const inputClasses =
  "mb-2 bg-primary-950 text-primary-100 block w-full rounded-xl px-3 py-1 sm:text-base/6 font-semibold border-4 border-accent-200/50 focus:outline-accent-200 focus:outline-2 overflow-x-scroll";

export default function StepFormRow<T extends FormWithSteps>({
  index,
  fieldId,
  register,
  insert,
  remove,
}: StepFormRowProps<T>) {
  return (
    <div
      className="flex items-center justify-between gap-5 px-2 w-full"
      key={fieldId}
    >
      <div className="flex flex-col w-full">
        <label htmlFor={`steps[${index}]`} className="text-sm font-semibold">
          Step {index + 1}
        </label>
        <input
          type="text"
          id={`steps[${index}]`}
          placeholder="Step Instruction"
          className={inputClasses}
          {...register(`steps.${index}.value` as Path<T>, {
            required: "Step instruction is required",
          })}
        />
      </div>

      <div className="flex items-center gap-2">
        <PlusCircleIcon
          className="size-8 stroke-accent-200 stroke-2 cursor-pointer hover:stroke-accent-500 shrink-0"
          onClick={() =>
            insert(index + 1, { id: String(index + 1), value: "" })
          }
        />
        <MinusCircleIcon
          className="size-8 stroke-accent-200 stroke-2 cursor-pointer hover:stroke-accent-500 shrink-0"
          onClick={() => remove(index)}
        />
      </div>
    </div>
  );
}
