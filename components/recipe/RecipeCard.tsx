import { useRouter } from "next/router";
import Image from "next/image";

import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

import Tag from "@/components/Tag";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import TriedBadge from "./TriedBadge";
import TagList from "@/components/recipe/TagList";
import DeleteRecipe from "./DeleteRecipe";

interface RecipeCardProps {
  title: string;
  categories: Array<{ name: string; id: string; color: string }>;
  imageUrl: string;
  tried: boolean;
  id: string;
}

export default function RecipeCard({
  title,
  categories,
  imageUrl,
  tried,
  id,
}: RecipeCardProps) {
  const router = useRouter();

  return (
    <div
      className={`bg-white/80 border-4 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-primary-900 flex flex-col h-full p-6 ${
        tried ? "border-accent-200" : "border-accent-200/20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Feathered Recipe Image  */}
        <div className="relative aspect-square w-full mb-2 shadow-lg rounded-xl">
          <Image
            src={imageUrl || "/default-recipe.png"}
            alt={title}
            fill
            className="object-cover rounded-xl"
            sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 40vw"
          />

          {/* Tried badge */}
          <TriedBadge tried={tried} id={id} />
        </div>

        {/* Recipe Info */}
        <div className="flex flex-col flex-1 w-full px-0.5">
          <div className="w-full">
            <Heading
              level="h5"
              className="text-accent-200 overflow-x-auto whitespace-nowrap scrollbar-hide"
            >
              {title}
            </Heading>
            {/* Tags - Horizontally scrollable */}
            <div className="mb-1">
              {categories.length > 0 && (
                <TagList>
                  {categories.map((category) => (
                    <Tag key={category.id} color={category.color}>
                      {category.name}
                    </Tag>
                  ))}
                </TagList>
              )}
            </div>
          </div>

          {/* Recipe Actions */}
          <div className="mt-auto pt-2 -mb-2 w-full flex justify-between border-t border-accent-200/20 gap-5">
            {/* Delete recipe */}
            <DeleteRecipe
              id={id}
              title={title}
              icon={<TrashIcon className="size-5" />}
              buttonVariant="link"
            />

            {/* See details */}
            <Button
              variant="link"
              icon={<EyeIcon className="size-5" />}
              onClick={() => router.push(`/recipes/${id}`)}
              className="hover:text-accent-500 font-medium"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
