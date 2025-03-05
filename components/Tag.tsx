import React from "react";

interface TagProps {
  children: string;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="bg-accent-500 text-white py-1 px-2 rounded-2xl text-xs">
      {children}
    </span>
  );
}
