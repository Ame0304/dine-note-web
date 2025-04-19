import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import IngredientChecklist from "@/components/dashboard/IngredientChecklist";

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
      {weekIngredients ? (
        <IngredientChecklist ingredients={weekIngredients} />
      ) : (
        <div className="text-center py-4 text-gray-500 font-semibold">
          <p>No meals planned for this week</p>
        </div>
      )}
    </Widget>
  );
}
