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
  if (!triedVsUntriedData || triedVsUntriedData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-400">No tried recipes data available</p>
      </div>
    );
  }

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
