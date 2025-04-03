import { useState } from "react";
import Button from "@/components/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Calendar() {
  const [startDate, setStartDate] = useState(getStartOfWeek(new Date()));

  // Get the start of the week (Monday)
  function getStartOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay(); // 0 = Sunday, 1 = Monday, etc.
    result.setDate(result.getDate() - day + 1); // Go back to Monday
    return result;
  }

  // Get dates for the week
  const getWeekDates = (start: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const handlePrevWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const onSelectDate = (date: Date) => {
    console.log(`Selected date: ${date.toDateString()}`);
  };

  const weekDates = getWeekDates(startDate);
  const today = new Date().toDateString();

  return (
    <div className="flex items-center justify-center gap-4 py-6 px-4 border-4 border-accent-200/50 rounded-3xl bg-white/80 shadow-lg shadow-primary-900">
      <Button onClick={handlePrevWeek} size="xs">
        <ChevronLeftIcon className="size-6 stroke-[4.5]" />
      </Button>
      <div className="flex gap-2 sm:gap-4">
        {weekDates.map((date) => (
          <button
            key={date.toDateString()}
            onClick={() => onSelectDate(date)}
            className={`px-1 py-2 w-8 text-xs sm:px-2 sm:py-4 sm:w-12 rounded-3xl sm:text-sm font-medium shadow-lg shadow-primary-900 transition-all hover:bg-accent-500 hover:text-white
          ${
            date.toDateString() === today
              ? "bg-accent-500 text-white"
              : "bg-white/80"
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
}
