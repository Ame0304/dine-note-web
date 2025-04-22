import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import IngredientChecklist from "@/components/dashboard/IngredientChecklist";
import Link from "next/link";

export default function WeekShoppingList({
  weekIngredients,
}: {
  weekIngredients: string[];
}) {
  return (
    <Widget size="medium">
      <Heading level="h4" styled="bg-accent-400">
        🛒 Week&apos;s Shopping list
      </Heading>
      <div className="px-2">
        {weekIngredients && weekIngredients.length !== 0 ? (
          <IngredientChecklist ingredients={weekIngredients} />
        ) : (
          <div className="text-center py-4 text-primary-50 font-semibold">
            <p>No meals planned for this week</p>
            <Link
              href="/meal-plans"
              className="text-primary-100 hover:text-accent-400 text-lg"
            >
              📆 Plan your meals
            </Link>
            <p>to get started!</p>
          </div>
        )}
      </div>
    </Widget>
  );
}
