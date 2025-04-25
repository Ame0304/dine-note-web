import React from "react";
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

const CookingHeatmap = React.memo(function CookingHeatMap({
  mealPlanTrend,
}: CookingHeatmapProps) {
  const today = new Date();
  const startDate = subMonths(today, 3);

  // Memoize the classForValue function
  const classForValue = React.useCallback(
    (value: CalendarHeatmap.ReactCalendarHeatmapValue<string> | undefined) => {
      if (!value || value.count === 0) {
        return "color-empty";
      }
      if (value.count > 3) return "color-scale-4";
      return `color-scale-${value.count}`;
    },
    []
  );

  // Memoize the tooltipDataAttrs function
  const tooltipDataAttrs = React.useCallback(
    (value: CalendarHeatmap.ReactCalendarHeatmapValue<string> | undefined) => {
      return {
        "data-tooltip-id": "calendar-tooltip",
        "data-tooltip-content": value?.date
          ? `${value.date}: ${value.count ?? 0} meal${
              (value.count ?? 0) > 1 ? "s" : ""
            } planned`
          : "No meals planned",
      } as React.HTMLAttributes<SVGElement>;
    },
    []
  );

  if (!mealPlanTrend || mealPlanTrend.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-400">No cooking trend data available</p>
      </div>
    );
  }

  return (
    <Widget size="medium">
      <Heading level="h4" styled="bg-accent-500">
        🗺️ Cooking HeatMap
      </Heading>

      <CalendarHeatmap
        startDate={startDate}
        endDate={subDays(today, 1)}
        values={mealPlanTrend}
        classForValue={classForValue}
        tooltipDataAttrs={tooltipDataAttrs}
      />
      <Tooltip id="calendar-tooltip" place="top" />
    </Widget>
  );
});

export default CookingHeatmap;
