import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ViewLink(recipeId: string) {
  return (
    <Link
      href={`/recipes/${recipeId}`}
      className="border-2 border-accent-500/80 bg-accent-500 text-primary-950 rounded-xl p-0.5"
    >
      <ChevronRightIcon className="size-5 stroke-[3]" />
    </Link>
  );
}
