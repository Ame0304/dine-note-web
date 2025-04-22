import React from "react";

export default function RecipeFormRow({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-5 px-2">
        <label htmlFor="title" className="text-lg font-semibold shrink-0">
          {label}
        </label>
        {children}
      </div>
      {error && <p className="px-2 text-sm text-primary-500 italic">{error}</p>}
    </div>
  );
}
