import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import Tag from "./Tag";
import Heading from "@/components/Heading";
import Image from "next/image";

import Button from "./Button";
import TriedBadge from "./TriedBadge";
import { useRouter } from "next/router";
import DeleteRecipe from "./DeleteRecipe";

interface RecipeCardProps {
  title: string;
  categories: string[];
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
    <div className="bg-white/30 border-2 border-accent-200 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-accent-500 flex flex-col h-full p-8 md:p-6">
      <div className="flex flex-col h-full">
        {/* Feathered Recipe Image  */}
        <div className="relative aspect-square w-full mb-2">
          <Image
            src={imageUrl || "/default-recipe.png"}
            alt={title}
            fill
            className="object-cover rounded-xl"
            sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 40vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>

          {/* Tried badge */}
          <TriedBadge tried={tried} id={id} />
        </div>

        {/* Recipe Info */}
        <div className="flex flex-col flex-1 w-full px-0.5">
          <div>
            <Heading level="h5" className="text-accent-200">
              {title}
            </Heading>
            {/* Tags - Horizontally scrollable */}
            <div className="w-full mb-1">
              {categories.length > 0 && (
                <div
                  className="mt-2 overflow-x-auto pb-2"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex gap-2 flex-nowrap">
                    {categories.map((category, i) => (
                      <Tag key={i} color="blue">
                        {category}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recipe Actions */}
          <div className="mt-auto pt-2 -mb-2 w-full flex justify-between border-t border-accent-200 gap-5">
            {/* Delete recipe */}
            <DeleteRecipe
              id={id}
              title={title}
              icon={<TrashIcon className="size-5" />}
              buttonVariant="link"
            />

            {/* See details */}
            <Button
              className="hover:text-accent-500"
              variant="link"
              icon={<EyeIcon className="size-5" />}
              onClick={() => router.push(`/recipes/${id}`)}
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
