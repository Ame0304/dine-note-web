import Image from "next/image";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Tag from "@/components/Tag";
import DeleteRecipe from "./DeleteRecipe";
import { RecipeWithUsername } from "@/pages/share/recipes/[recipeId]";
import toast from "react-hot-toast";

export default function RecipeOverview({
  recipe,
  onOpen,
  isPublic = false,
}: {
  recipe: RecipeWithUsername;
  onOpen?: () => void;
  isPublic?: boolean;
}) {
  const handleShare = async () => {
    // Create the share URL
    const shareUrl = `${window.location.origin}/share/recipes/${recipe.id}`;

    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied!", { duration: 5000 });
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast("Failed to copy link", { duration: 2000 });
    }
  };

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
        <div className="bg-gradient-to-b from-white from-20% to-white/50 shadow-lg p-6 relative -mt-12 border-4 border-accent-200 rounded-2xl">
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
          <div className="pt-20">
            <div className="flex flex-col justify-bwtween items-center gap-4">
              <Heading level="h3" className="text-center">
                {recipe.title}
              </Heading>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                <div className="text-xs flex gap-2 items-center border-2 border-accent-200 rounded-full pr-2">
                  <span className="bg-accent-200 rounded-full px-2.5 py-0.5 text-accent-500 font-semibold">
                    {isPublic ? "Shared by" : "🧑‍🍳 Chef "}
                  </span>
                  {recipe.username || "Unknown chef"}
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {recipe.categories.map((category) => (
                    <Tag key={category.name} color={category.color}>
                      {category.name}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-accent-200 p-4 rounded-xl w-full text-primary-950">
                <Heading level="h5">📝 Description</Heading>
                <p className="mt-2 text-sm">{recipe.description}</p>
              </div>

              {/* Recipe Actions */}
              {!isPublic ? (
                <div className="flex flex-col items-center gap-5 w-full">
                  <Button variant="primary">🍳 Cook this</Button>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleShare}>
                      Share
                    </Button>
                    <Button variant="outline" onClick={onOpen}>
                      Edit
                    </Button>
                    <DeleteRecipe
                      id={recipe.id}
                      title={recipe.title}
                      buttonVariant="outline"
                    />
                  </div>
                </div>
              ) : (
                <Button variant="primary" onClick={onOpen}>
                  🍱 Order from {recipe.username}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
