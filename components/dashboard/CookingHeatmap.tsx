import Heading from "@/components/Heading";
import Widget from "@/components/dashboard/Widget";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, subMonths } from "date-fns";
import { MealPlanTrendData } from "@/lib/services/dashboardService";

interface CookingHeatmapProps {
  mealPlanTrend: MealPlanTrendData[];
}

export default function CookingHeatmap({ mealPlanTrend }: CookingHeatmapProps) {
  const today = new Date();
  const startDate = subMonths(today, 3);
  return (
    <Widget size="medium">
      <Heading level="h4" styled="bg-accent-500">
        🗺️ Cooking HeatMap
      </Heading>

      <CalendarHeatmap
        startDate={startDate}
        endDate={subDays(today, 1)}
        values={mealPlanTrend}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return "color-empty";
          }
          if (value.count > 3) return "color-scale-4";
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tooltip-id": "calendar-tooltip",
            "data-tooltip-content": value?.date
              ? `${value.date}: ${value.count ?? 0} meal${
                  (value.count ?? 0) > 1 ? "s" : ""
                } planned`
              : "No meals planned",
          } as React.HTMLAttributes<SVGElement>;
        }}
      />
      <Tooltip id="calendar-tooltip" place="top" />
    </Widget>
  );
}
