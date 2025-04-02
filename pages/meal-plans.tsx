import Heading from "@/components/Heading";
import Calendar from "@/components/meal-plans/Calendar";

export default function MealPlansPage() {
  return (
    <>
      <Heading level="h1" className="mb-4">
        What&apos;s to eat this week?
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Left Container: Analytics (2/3 width) */}
        <div className="col-span-9 lg:col-span-6 flex flex-col gap-4">
          <div>
            <Calendar />
          </div>
          <div>recipes list grid - name & image</div>
        </div>
        {/* Right Container: Meal Plan (1/3 width) */}
        <div className="flex flex-col gap-4 col-span-3">nnn</div>
      </div>
    </>
  );
}
