import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function IngredientRow({
  name,
  quantity,
}: {
  name: string;
  quantity: string;
}) {
  return (
    <div className="flex justify-between items-center border-2 border-accent-200 rounded-3xl px-5 py-0.5 shadow-md shadow-accent-500 text-sm lg:text-base">
      <span className="text-accent-200 font-semibold ">{name}</span>
      <div className="flex justify-end items-center gap-5">
        <span>{quantity}</span>
        <CheckCircleIcon className="size-6 lg:size-8 text-accent-200" />
      </div>
    </div>
  );
}
