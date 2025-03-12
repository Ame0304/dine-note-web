import { CheckCircleIcon } from "@heroicons/react/24/solid";
import useUpdateRecipe from "@/hooks/recipes/useUpdateRecipe";

interface TriedBadgeParams {
  tried: boolean;
  id: string;
}

export default function TriedBadge({ tried, id }: TriedBadgeParams) {
  const { updateRecipe } = useUpdateRecipe();

  return (
    <div className="relative flex justify-center">
      <div className="relative flex justify-center">
        <div
          className={`absolute -top-12 rounded-full p-0.5 transform transition-all hover:scale-105 border-accent-200 border-2 ${
            tried ? "bg-accent-200" : "bg-primary-950"
          }`}
        >
          <CheckCircleIcon
            className={`size-10 cursor-pointer ${
              tried
                ? "stroke-accent-200 fill-accent-500"
                : "stroke-accent-200 fill-primary-950"
            }`}
            onClick={() => updateRecipe({ tried: !tried, recipeId: id })}
          />
        </div>
      </div>
    </div>
  );
}
