import { useState } from "react";
import useDeleteRecipe from "@/hooks/recipes/useDeleteRecipe";
import useUpdateRecipe from "@/hooks/recipes/useUpdateRecipe";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Tag from "./Tag";
import Heading from "@/components/Heading";
import Image from "next/image";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

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
    <div className="bg-white/70 rounded-xl shadow-xl flex flex-col items-center transform transition-all hover:scale-105 overflow-hidden  hover:shadow-primary-900">
      <div className="relative w-full pb-[75%]">
        {/* Feathered Recipe Image  */}
        <Image
          src={imageUrl || "/default-recipe.png"}
          alt={title}
          fill
          className="object-cover absolute top-0 left-0"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>

        {/* Delete Recipe */}

        <div
          className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md transform transition-all hover:scale-105 hover:shadow-primary-900"
          onClick={() => setIsOpenDelete(true)}
        >
          <TrashIcon className="size-7 stroke-accent-500 cursor-pointer" />
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

      {/* Tried badge instead of divider */}
      <div className="relative w-full flex justify-center mb-2">
        <div className="absolute -top-6 bg-primary-950 rounded-full p-1 shadow-primary-900  shadow-md transform transition-all hover:scale-105">
          <CheckCircleIcon
            className={`size-10 cursor-pointer ${
              tried
                ? "stroke-primary-950 fill-accent-500"
                : "stroke-accent-500 fill-white"
            }`}
            onClick={() => updateRecipe({ tried: !tried, recipeId: id })}
          />
        </div>
      </div>

      {/* Recipe Info */}
      <div className="grid grid-rows-[auto_auto_auto] h-full p-4 w-full">
        <div className="mb-2">
          <Heading level="h5">{title}</Heading>
          {/* Tags */}
          <div className="w-full mb-2">
            {categories.length > 0 && (
              <div className="mt-2 w-full flex flex-wrap justify-start gap-2">
                {categories.map((category, i) => (
                  <Tag key={i}>{category}</Tag>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* See Details Button */}
        <div className="mt-auto pt-2 w-full flex justify-end border-t border-primary-200/30">
          <button className="flex items-center gap-2 text-sm text-accent-500 hover:text-accent-400 transition-colors">
            <span>Details</span>
            <EyeIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
