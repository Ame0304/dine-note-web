import Loading from "@/components/Loading";
import Button from "@/components/Button";
import { GeneratedRecipe } from "./AIRecipeBox";

interface RecipeDisplayProps {
  isGenerating: boolean;
  error: string | null;
  recipe: GeneratedRecipe | null;
  onRetry: () => void;
  className?: string;
}

export default function AIRecipeDisplay({
  isGenerating,
  error,
  recipe,
  onRetry,
  className,
}: RecipeDisplayProps) {
  return (
    <div
      className={`${className} max-h-[500px] overflow-y-auto scrollbar-hide mt-4 p-4 rounded-2xl bg-white/80 shadow-lg flex flex-col`}
    >
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <Loading size="large" message="Our chef is cooking up a recipe..." />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <p className="text-red-500 font-medium">{error}</p>
          <Button className="mt-4" variant="outline" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      ) : (
        recipe && (
          <div className="animate-fadeIn">
            <h3 className="text-lg font-bold mb-2">🍜 {recipe.title}</h3>
            <p className="mb-4">{recipe.description}</p>

            <div className="mb-4">
              <h4 className="text-md font-semibold mb-2">🥔 Ingredients</h4>
              <ul className="list-disc pl-5 text-sm">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="opacity-0"
                    style={{
                      animation: `fadeSlideIn 0.5s ease-out forwards ${
                        index * 100
                      }ms`,
                    }}
                  >
                    <span className="font-medium">{ingredient.name}</span> -{" "}
                    {ingredient.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-2">🥘 Steps</h4>
              <ol className="list-decimal pl-5 text-sm">
                {recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="mb-1 opacity-0"
                    style={{
                      animation: `fadeSlideIn 0.5s ease-out forwards ${
                        (index + recipe.ingredients.length) * 100
                      }ms`,
                    }}
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )
      )}
    </div>
  );
}
