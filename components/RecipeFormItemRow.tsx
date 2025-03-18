import React from "react";
import RecipeFormRow from "./RecipeFormRow";
import RecipeFormInput from "./RecipeFormInput";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

interface RecipeFormItemRowProps {
  label: string;
  value: string;
  id: string;
  onAdd: () => void;
  onDelete: () => void;
  placeholder?: string;
  isIngredient?: boolean;
}

export default function RecipeFormItemRow({
  value,
  id,
  onAdd,
  onDelete,
  placeholder = "",
  label,
}: RecipeFormItemRowProps) {
  // For ingredients, we use the name as label, for steps we use the number

  return (
    <RecipeFormRow label={label}>
      <RecipeFormInput
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
      />
      <PlusCircleIcon
        className="size-8 stroke-accent-200 stroke-2 cursor-pointer hover:stroke-accent-500 shrink-0"
        onClick={onAdd}
      />
      <MinusCircleIcon
        className="size-8 stroke-accent-200 stroke-2 cursor-pointer hover:stroke-accent-500 shrink-0"
        onClick={onDelete}
      />
    </RecipeFormRow>
  );
}
