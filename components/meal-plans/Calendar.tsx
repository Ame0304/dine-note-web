import React from "react";
import { useState, useMemo, useCallback } from "react";
import Button from "@/components/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getStartOfWeek } from "@/lib/helpers";

interface CalendarProps {
  onSelect: (date: Date) => void;
  selectedDate: Date;
}

const Calendar = React.memo(function Calendar({
  onSelect,
  selectedDate,
}: CalendarProps) {
  const [startDate, setStartDate] = useState(getStartOfWeek(selectedDate));

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  }, [startDate]);
  const today = new Date().toDateString();

  const handlePrevWeek = useCallback(() => {
    setStartDate((prevDate) => {
      const newStartDate = new Date(prevDate);
      newStartDate.setDate(prevDate.getDate() - 7);
      return newStartDate;
    });
  }, []);

  const handleNextWeek = useCallback(() => {
    setStartDate((prevDate) => {
      const newStartDate = new Date(prevDate);
      newStartDate.setDate(prevDate.getDate() + 7);
      return newStartDate;
    });
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 py-6 px-4 border-4 border-accent-200/50 rounded-3xl bg-white/70 shadow-lg shadow-primary-900">
      <Button onClick={handlePrevWeek} size="xs">
        <ChevronLeftIcon className="size-6 stroke-[4.5]" />
      </Button>
      <div className="flex gap-2 sm:gap-4">
        {weekDates.map((date) => (
          <button
            key={date.toDateString()}
            onClick={() => onSelect(date)}
            className={`px-1 py-2 w-8 text-xs sm:px-2 sm:py-4 sm:w-12 rounded-3xl sm:text-sm font-medium shadow-lg shadow-primary-900 transition-all hover:bg-accent-500 hover:text-white
          ${
            date.toDateString() === selectedDate.toDateString()
              ? "bg-accent-500 text-white"
              : "bg-white/80"
          } ${
              date.toDateString() === today
                ? "border-accent-500 border-2 text-accent-500"
                : ""
            }`}
          >
            <div>
              {date.toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </div>
            <div>
              {date.toLocaleDateString("en-US", {
                day: "numeric",
              })}
            </div>
          </button>
        ))}
      </div>
      <Button onClick={handleNextWeek} size="xs">
        <ChevronRightIcon className="size-6 stroke-[4.5]" />
      </Button>
    </div>
  );
});

export default Calendar;
