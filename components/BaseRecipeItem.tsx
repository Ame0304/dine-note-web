import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import TagList from "@/components/recipe/TagList";
import Tag from "@/components/Tag";

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface BaseRecipe {
  id: string;
  title: string;
  imageUrl: string;
  categories?: Category[];
}

interface BaseRecipeItemProps {
  recipe: BaseRecipe;
  rightElement?: ReactNode;
  className?: string;
  maxTagWidth?: string;
}

export default function BaseRecipeItem({
  recipe,
  rightElement,
  className = "",
  maxTagWidth = "max-w-[190px]",
}: BaseRecipeItemProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Link href={`/recipes/${recipe.id}`}>
        <Image
          src={recipe.imageUrl || "/default-recipe.png"}
          alt={`recipe image of ${recipe.title}`}
          width={50}
          height={50}
          className="h-14 w-14 rounded-2xl inline-block object-cover shadow-lg"
        />
      </Link>

      <div className="flex flex-col items-start flex-1 min-w-0">
        <p className="text-md font-semibold w-full truncate">{recipe.title}</p>
        {recipe.categories && recipe.categories.length > 0 && (
          <div className={maxTagWidth}>
            <TagList>
              {recipe.categories.map((category) => (
                <Tag key={category.id} color={category.color}>
                  {category.name}
                </Tag>
              ))}
            </TagList>
          </div>
        )}
      </div>

      {rightElement && rightElement}
    </div>
  );
}
