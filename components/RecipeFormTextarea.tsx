import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
}

export default function RecipeFormTextarea({ ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      id={props.id}
      rows={props.rows || 2}
      className="text-primary-100 block w-full rounded-xl p-3 focus:outline-2 focus:outline-accent-200 sm:text-base/6 font-semibold max-w-108 min-w-40 bg-primary-950 border-4 border-accent-200/50"
    />
  );
}
