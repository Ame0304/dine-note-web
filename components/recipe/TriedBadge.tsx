import { CheckCircleIcon } from "@heroicons/react/24/solid";
import useToggleRecipeTried from "@/hooks/recipes/useToggleRecipeTried";

interface TriedBadgeParams {
  tried: boolean;
  id: string;
}

export default function TriedBadge({ tried, id }: TriedBadgeParams) {
  const { toggleRecipeTried } = useToggleRecipeTried();

  return (
    <div className="relative flex justify-center">
      <div className="relative flex justify-center">
        <div
          className={`absolute -top-12 rounded-full p-0.5 transform transition-all hover:scale-105 border-accent-200/20 border-4 hover:border-accent-200 ${
            tried ? "bg-accent-200" : "bg-primary-950"
          }`}
        >
          <CheckCircleIcon
            className={`size-10 cursor-pointer ${
              tried
                ? "stroke-accent-200 fill-accent-500"
                : "stroke-accent-200/20 fill-primary-950 "
            }`}
            onClick={() => toggleRecipeTried({ tried: !tried, id })}
          />
        </div>
      </div>
    </div>
  );
}
