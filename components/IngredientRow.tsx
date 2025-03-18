import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function IngredientRow({
  name,
  quantity,
}: {
  name: string;
  quantity: string;
}) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div
      className={`flex justify-between items-center rounded-2xl px-5 py-0.5 shadow-md shadow-primary-900 text-sm lg:text-base ${
        isChecked ? "bg-accent-200" : "bg-white/50"
      }`}
    >
      <span
        className={`font-semibold ${
          isChecked ? "text-primary-50 line-through" : ""
        }`}
      >
        {name}
      </span>
      <div className="flex justify-end items-center gap-5">
        <span className={isChecked ? "text-primary-50 line-through" : ""}>
          {quantity}
        </span>
        <button
          onClick={toggleChecked}
          className="focus:outline-none"
          aria-label={isChecked ? "Mark as unavailable" : "Mark as available"}
        >
          {isChecked ? (
            <CheckCircleSolidIcon className="size-6 lg:size-8 text-accent-500 transition-colors" />
          ) : (
            <CheckCircleIcon className="size-6 lg:size-8 text-accent-200 hover:text-accent-500 transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
}
