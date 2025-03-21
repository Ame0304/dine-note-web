import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { UseFormRegister } from "react-hook-form";

interface RecipeFormItemRowProps {
  name: string;
  index: number;
  fieldId: string;
  register: UseFormRegister<{
    [key: string]: { name: string; quantity: string }[];
  }>;
  append: (value: { name: string; quantity: string }) => void;
  remove: (index: number) => void;
}

const inputClasses =
  "mb-2 bg-primary-950 text-primary-100 block w-full rounded-xl px-3 py-1 sm:text-base/6 font-semibold border-4 border-accent-200/50 focus:outline-accent-200 focus:outline-2 overflow-x-scroll";

export default function RecipeFormComplexRow({
  name,
  index,
  fieldId,
  register,
  append,
  remove,
}: RecipeFormItemRowProps) {
  return (
    <div className="flex items-center justify-between gap-5 px-2" key={fieldId}>
      {/* Name Input */}
      <div className="flex flex-col w-1/2">
        <label
          htmlFor={`${name}[${index}].name`}
          className="text-sm font-semibold"
        >
          Name
        </label>
        <input
          type="text"
          id={`${name}[${index}].name`}
          placeholder={"Ingredient Name"}
          className={inputClasses}
          {...register(`${name}[${index}].name` as const, {
            required: "Name is required",
          })}
        />
      </div>

      {/* Quantity Input */}
      <div className="flex flex-col w-1/3">
        <label
          htmlFor={`${name}[${index}].quantity`}
          className="text-sm font-semibold"
        >
          Quantity
        </label>
        <input
          type="text"
          id={`${name}[${index}].quantity`}
          placeholder={"Quantity"}
          className={inputClasses}
          {...register(`${name}[${index}].quantity` as const, {
            required: "Quantity is required",
          })}
        />
      </div>

      {/* Add and Delete Buttons */}
      <div className="flex items-center gap-2">
        <PlusCircleIcon
          className="size-8 stroke-accent-200 stroke-2 cursor-pointer hover:stroke-accent-500 shrink-0"
          onClick={() => append({ name: "", quantity: "" })}
        />
        <MinusCircleIcon
          className="size-8 stroke-accent-200 stroke-2 cursor-pointer hover:stroke-accent-500 shrink-0"
          onClick={() => remove(index)}
        />
      </div>
    </div>
  );
}
