import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { UseFormRegister } from "react-hook-form";

interface RecipeFormComplexRowProps {
  name: string;
  index: number;
  fieldId: string;
  register: UseFormRegister<{
    [key: string]: { name?: string; quantity?: string }[];
  }>;
  insert: (
    index: number,
    value: { name: string; quantity: string } | string
  ) => void;
  remove: (index: number) => void;
  type?: "ingredient" | "step";
}
const inputClasses =
  "mb-2 bg-primary-950 text-primary-100 block w-full rounded-xl px-3 py-1 sm:text-base/6 font-semibold border-4 border-accent-200/50 focus:outline-accent-200 focus:outline-2 overflow-x-scroll";

export default function RecipeFormComplexRow({
  name,
  index,
  fieldId,
  register,
  insert,
  remove,
  type = "ingredient",
}: RecipeFormComplexRowProps) {
  const label = type === "ingredient" ? "Name" : `Step ${index + 1}`;
  const placeholder =
    type === "ingredient" ? "Ingredient Name" : "Step Instruction";
  const inputField =
    type === "ingredient" ? `${name}[${index}].name` : `${name}[${index}]`;

  const renderQuantityInput = () => {
    if (type !== "ingredient") return null;

    return (
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
          placeholder="Quantity"
          className={inputClasses}
          {...register(`${name}[${index}].quantity` as const, {
            required: "Quantity is required",
          })}
        />
      </div>
    );
  };

  return (
    <div
      className={`flex items-center justify-between gap-5 px-2 ${
        type === "step" ? "w-full" : ""
      } `}
      key={fieldId}
    >
      <div className={`flex flex-col ${type === "step" ? "w-3/4" : "w-1/2"}`}>
        <label htmlFor={inputField} className="text-sm font-semibold">
          {label}
        </label>
        <input
          type="text"
          id={inputField}
          placeholder={placeholder}
          className={inputClasses}
          {...register(inputField, {
            required: `${label} is required`,
          })}
        />
      </div>

      {renderQuantityInput()}

      <div className="flex items-center gap-2">
        <PlusCircleIcon
          className="size-8 stroke-accent-200 stroke-2 cursor-pointer hover:stroke-accent-500 shrink-0"
          onClick={() =>
            insert(
              index + 1,
              type === "ingredient" ? { name: "", quantity: "" } : ""
            )
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
