import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Tag from "@/components/Tag";
import TagList from "@/components/recipe/TagList";
import { RecentRecipe } from "@/lib/services/dashboardService";

export default function RecipeItem({ recipe }: { recipe: RecentRecipe }) {
  return (
    <li className="border-b py-2 flex justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <Image
          src={recipe.imageUrl || "/default-recipe.png"}
          alt="recipe image of ${title}"
          width={50}
          height={50}
          className="w-16 h-16 rounded-full inline-block"
        />
        {/* Recipe Title and Tags */}
        <div className="flex flex-col items-start">
          <p className="text-md font-semibold">{recipe.title}</p>
          <div className="max-w-[200px]">
            <TagList>
              {recipe.categories.map((category) => (
                <Tag key={category.id} color={category.color}>
                  {category.name}
                </Tag>
              ))}
            </TagList>
          </div>
        </div>
      </div>
      <Link
        href={`/recipes/${recipe.id}`}
        className="border-4 border-accent-500/80 text-accent-500 hover:bg-accent-500 hover:text-primary-950 rounded-xl p-0.5 "
      >
        <ChevronRightIcon className="size-5 stroke-[4.5]" />
      </Link>
    </li>
  );
}
