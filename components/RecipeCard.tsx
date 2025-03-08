import { useState } from "react";
import { useDeleteRecipe } from "@/hooks/recipes/useDeleteRecipe";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import Tag from "./Tag";
import Heading from "@/components/Heading";
import Image from "next/image";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface RecipeCardProps {
  title: string;
  description: string;
  categories: string[];
  imageUrl: string;
  tried: boolean;
  id: string;
}

export default function RecipeCard({
  title,
  description,
  categories,
  imageUrl,
  tried,
  id,
}: RecipeCardProps) {
  const { isDeleting, deleteRecipe } = useDeleteRecipe();
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleDeleteConfirm = () => {
    deleteRecipe(id);
    setIsOpenDelete(false);
  };

  return (
    <div className="bg-primary-950/80 rounded-xl shadow-xl flex flex-col items-center overflow-hidden  hover:shadow-primary-900">
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
      <div className="relative w-full flex justify-center mb-4">
        <div className="absolute -top-6 bg-primary-950 rounded-full p-1 transform transition-all hover:scale-105 hover:shadow-primary-900 hover:shadow-md">
          <CheckCircleIcon
            className={`size-10 ${
              tried
                ? "stroke-primary-950 fill-accent-500"
                : "stroke-accent-500 fill-white"
            }`}
          />
        </div>
      </div>

      {/* Recipe Info */}
      <div className="w-full flex flex-col p-4 h-full justify-between">
        <Heading level="h4">{title}</Heading>
        <p className="text-primary-50 text-md">{description}</p>
        {/* Tags */}
        <div className="mt-4 w-full flex flex-wrap justify-start gap-2">
          {categories.map((category, i) => (
            <Tag key={i}>{category}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
