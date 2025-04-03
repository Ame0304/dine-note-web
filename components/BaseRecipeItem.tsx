import Image from "next/image";
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
  imageSize?: "sm" | "md" | "lg";
  rightElement?: ReactNode;
  className?: string;
  maxTagWidth?: string;
}

export default function BaseRecipeItem({
  recipe,
  imageSize = "md",
  rightElement,
  className = "",
  maxTagWidth = "max-w-[200px]",
}: BaseRecipeItemProps) {
  const imageSizes = {
    sm: "w-12 h-12",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <div className="flex items-center gap-3">
        <Image
          src={recipe.imageUrl || "/default-recipe.png"}
          alt={`recipe image of ${recipe.title}`}
          width={50}
          height={50}
          className={`rounded-2xl inline-block ${imageSizes[imageSize]}`}
        />

        <div className="flex flex-col items-start">
          <p className="text-md font-semibold">{recipe.title}</p>
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
      </div>

      {rightElement && rightElement}
    </div>
  );
}
