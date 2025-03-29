import React from "react";

export default function TagList({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2 flex-nowrap">{children}</div>
    </div>
  );
}
