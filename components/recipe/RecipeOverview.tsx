import Image from "next/image";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Tag from "@/components/Tag";
import DeleteRecipe from "./DeleteRecipe";
import { Recipe } from "@/lib/services/recipeService";

export default function RecipeOverview({
  recipe,
  onEdit,
  isPublic = false,
}: {
  recipe: Recipe;
  onEdit?: () => void;
  isPublic?: boolean;
}) {
  return (
    <div className="mx-auto md:w-1/3 w-full">
      <div className="relative">
        {/* Background Image */}
        <div className="h-48 w-full rounded-t-2xl overflow-hidden relative">
          <Image
            src="/detail-bg.png"
            alt="Recipe background image"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 40vw, (min-width: 768px) 90vw, 100vw"
          />
        </div>

        {/* Recipe Overview Card */}
        <div className="bg-white shadow-lg p-6 relative -mt-12 border-4 border-accent-200 rounded-2xl">
          {/* Round Recipe Image */}
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-accent-200 shadow-xl shadow-primary-900">
              <Image
                src={recipe.imageUrl || "/default-recipe.png"}
                alt={recipe.title}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Recipe Overview Content */}
          <div className="pt-24">
            <div className="flex flex-col justify-bwtween items-center gap-4">
              <Heading level="h4" className="text-center">
                {recipe.title}
              </Heading>

              <div className="flex flex-wrap gap-2 justify-center">
                {recipe.categories.map((category) => (
                  <Tag key={category.name} color={category.color}>
                    {category.name}
                  </Tag>
                ))}
              </div>

              {/* Description */}
              <div className="bg-primary-950 p-4 rounded-xl w-full">
                <Heading level="h5" className="text-accent-200">
                  📝 Description
                </Heading>
                <p className="mt-2 text-sm">{recipe.description}</p>
              </div>

              {/* Recipe Actions */}
              {!isPublic && (
                <div className="flex flex-col items-center gap-5 w-full">
                  <Button variant="primary">🍳 Cook this</Button>
                  <div className="flex gap-3">
                    <Button variant="outline">Share</Button>
                    <Button variant="outline" onClick={onEdit}>
                      Edit
                    </Button>
                    <DeleteRecipe
                      id={recipe.id}
                      title={recipe.title}
                      buttonVariant="outline"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
