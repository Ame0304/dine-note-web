import { useState } from "react";
import useDeleteRecipe from "@/hooks/recipes/useDeleteRecipe";
import useUpdateRecipe from "@/hooks/recipes/useUpdateRecipe";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Tag from "./Tag";
import Heading from "@/components/Heading";
import Image from "next/image";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import Button from "./Button";

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
  const { isDeleting, deleteRecipe } = useDeleteRecipe();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const { updateRecipe } = useUpdateRecipe();

  const handleDeleteConfirm = () => {
    deleteRecipe(id);
    setIsOpenDelete(false);
  };

  return (
    <div className="bg-white/70 rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-primary-900 flex flex-col h-full p-8 md:p-6">
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
          <div className="relative flex justify-center">
            <div className="absolute -top-6 bg-white rounded-full p-0.5 transform transition-all hover:scale-105">
              <CheckCircleIcon
                className={`size-10 cursor-pointer ${
                  tried
                    ? "stroke-white fill-accent-500"
                    : "stroke-accent-500 fill-white"
                }`}
                onClick={() => updateRecipe({ tried: !tried, recipeId: id })}
              />
            </div>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="flex flex-col flex-1 w-full px-0.5">
          <div>
            <Heading level="h5">{title}</Heading>
            {/* Tags - Horizontally scrollable */}
            <div className="w-full mb-1">
              {categories.length > 0 && (
                <div
                  className="mt-2 overflow-x-auto pb-2"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex gap-2 flex-nowrap">
                    {categories.map((category, i) => (
                      <Tag key={i}>{category}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto pt-2 -mb-2 w-full flex justify-between border-t border-primary-900/40 gap-5">
            {/* Delete recipe */}
            <Button
              variant="link"
              icon={<TrashIcon className="size-5" />}
              onClick={() => setIsOpenDelete(true)}
            >
              Delete
            </Button>

            {/* See details */}
            <Button variant="link" icon={<EyeIcon className="size-5" />}>
              Details
            </Button>
          </div>
        </div>

        <ConfirmDeleteDialog
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
          onConfirm={handleDeleteConfirm}
          title="Recipe"
          itemName={title}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
