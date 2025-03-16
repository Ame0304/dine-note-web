import { useState } from "react";
import Heading from "./Heading";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";

export default function ExpandableSection({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mt-4 p-4 rounded-2xl border-2 border-accent-200 bg-white/80 ">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span className="mr-2 text-xl">{icon}</span>
          <Heading level="h5" className="text-accent-200">
            {title}
          </Heading>
        </div>
        <span className="text-xl">
          {isExpanded ? (
            <ChevronDoubleUpIcon className="size-5" />
          ) : (
            <ChevronDoubleDownIcon className="size-5" />
          )}
        </span>
      </div>

      {isExpanded && <div className="my-4 px-2 lg:px-8">{children}</div>}
    </div>
  );
}
