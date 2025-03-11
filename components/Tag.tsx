import React from "react";

interface TagProps {
  children: string;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="border-accent-500/50 border-2 text-accent-500 py-0.5 px-2 rounded-2xl text-xs shadow-sm">
      {children}
    </span>
  );
}
