import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import TriedChart from "@/components/dashboard/TriedChart";

interface TriedPieChartProps {
  triedRecipesPercentage: number;
  triedVsUntriedData: {
    name: string;
    value: number;
  }[];
}

export default function TriedPieChart({
  triedRecipesPercentage,
  triedVsUntriedData,
}: TriedPieChartProps) {
  return (
    <Widget size="medium">
      <div className="flex flex-wrap justify-between items-center">
        <Heading level="h4" styled="bg-accent-300">
          👍 Tried Recipes
        </Heading>
        <span className="text-3xl text-accent-300 font-semibold">
          {triedRecipesPercentage}%
        </span>
      </div>
      <TriedChart data={triedVsUntriedData} />
    </Widget>
  );
}
