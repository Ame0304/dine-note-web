import { useState } from "react";

export default function StepRow({
  item,
}: {
  item: { step: number; instruction: string };
}) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div
      key={item.step}
      className="flex justify-start items-center mb-6 last:mb-0"
    >
      {/* Circle marker */}
      <button
        onClick={toggleChecked}
        className="focus:outline-none"
        aria-label={isChecked ? "Mark as undone" : "Mark as done"}
      >
        <div
          className={`w-7 h-7 border-2 border-accent-200 rounded-full shadow-md shadow-accent-500 shrink-0 ${
            isChecked ? "bg-accent-500" : ""
          }`}
        >
          <div className="text-md text-center">{item.step}</div>
        </div>
      </button>

      {/* Step content */}
      <p
        className={`text-gray-700 ml-2 lg:ml-5 ${
          isChecked ? "line-through" : ""
        }`}
      >
        {item.instruction}
      </p>
    </div>
  );
}
