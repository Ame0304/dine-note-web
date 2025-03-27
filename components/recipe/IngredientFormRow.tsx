import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { UseFormRegister, Path } from "react-hook-form";
import { FormWithIngredients } from "./IngredientsFieldset";

interface IngredientFormRowProps<T extends FormWithIngredients> {
  index: number;
  fieldId: string;
  register: UseFormRegister<T>;
  insert: (
    index: number,
    value: { id?: string; name: string; quantity: string }
  ) => void;
  remove: (index: number) => void;
}

const inputClasses =
  "mb-2 bg-primary-950 text-primary-100 block w-full rounded-xl px-3 py-1 sm:text-base/6 font-semibold border-4 border-accent-200/50 focus:outline-accent-200 focus:outline-2 overflow-x-scroll";

// TODO: validation

export default function IngredientFormRow<T extends FormWithIngredients>({
  index,
  fieldId,
  register,
  insert,
  remove,
}: IngredientFormRowProps<T>) {
  const name = "ingredients";
  return (
    <div className="flex items-center justify-between gap-5 px-2" key={fieldId}>
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
          placeholder="Ingredient Name"
          className={inputClasses}
          {...register(`ingredients.${index}.name` as Path<T>, {
            required: "Name is required",
          })}
        />
      </div>

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
          {...register(`ingredients.${index}.quantity` as Path<T>, {
            required: "Quantity is required",
          })}
        />
      </div>

      <div className="flex items-center gap-2">
        <PlusCircleIcon
          className="size-8 stroke-accent-200 stroke-2 cursor-pointer hover:stroke-accent-500 shrink-0"
          onClick={() =>
            insert(index + 1, {
              name: "",
              quantity: "",
            })
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
