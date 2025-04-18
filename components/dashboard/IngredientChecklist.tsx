/*
Handle ingredient checklist functionality in two places:
1. Dashboard - weekly ingredient shopping list
  Input data format: string[]
2. Recipe details - ingredient checklist of each recipe
  Input data format: {name: string; quantity: string;}[]
*/

import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

interface IngredientCheckItem {
  name: string;
  quantity?: string;
}

export default function IngredientChecklist({
  ingredients,
}: {
  ingredients: (IngredientCheckItem | string)[];
}) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  function toggleItem(ingredientName: string) {
    setCheckedItems((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((item) => item !== ingredientName)
        : [...prev, ingredientName]
    );
  }

  // Normalize ingredients to the Ingredient interface format
  const normalizedIngredients: IngredientCheckItem[] = ingredients.map((item) =>
    typeof item === "string" ? { name: item } : item
  );

  return (
    <ul className="space-y-2 mt-3 max-h-[200px] overflow-y-auto scrollbar-hide font-semibold">
      {normalizedIngredients.map((ingredient) => {
        const isChecked = checkedItems.includes(ingredient.name);

        return (
          <li
            key={ingredient.name} // Use name as the key
            className={`flex items-center justify-between cursor-pointer rounded-xl px-5 py-0.5 ${
              isChecked ? "bg-accent-200" : "bg-primary-950"
            }`}
            onClick={() => toggleItem(ingredient.name)} // Toggle using the name
          >
            <span
              className={`${isChecked ? "line-through text-primary-50" : ""}`}
            >
              {ingredient.name}
            </span>

            <div className="flex items-center justify-between gap-3">
              {/* Conditionally display quantity if it exists */}
              {ingredient.quantity && (
                <span
                  className={`text-sm text-primary-50 ${
                    isChecked ? "line-through" : ""
                  }`}
                >
                  {ingredient.quantity}
                </span>
              )}
              <button
                aria-label={
                  isChecked ? "Mark as unavailable" : "Mark as available"
                }
                className="focus:outline-none"
              >
                {isChecked ? (
                  <CheckCircleSolidIcon className="size-6 lg:size-8 text-accent-400 transition-colors" />
                ) : (
                  <CheckCircleIcon className="size-6 lg:size-8 text-primary-50 hover:text-accent-400 transition-colors" />
                )}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
