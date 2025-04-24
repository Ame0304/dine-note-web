import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ViewLink({ recipeId }: { recipeId: string }) {
  return (
    <Link
      href={`/recipes/${recipeId}`}
      className="text-primary-950 bg-gradient-to-r from-accent-200 to-primary-900 hover:bg-gradient-to-l rounded-xl p-1"
    >
      <ChevronRightIcon className="size-5 stroke-[3]" />
    </Link>
  );
}
