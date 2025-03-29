import React from "react";

interface TagProps {
  children: string;
  color: string;
  size?: "regular" | "small";
}

const categoryColorMap = {
  red: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
  yellow: "bg-yellow-100 text-yellow-700",
  green: "bg-green-100 text-green-700",
  teal: "bg-teal-100 text-teal-700",
  blue: "bg-sky-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  pink: "bg-pink-100 text-pink-700",
};

const sizeClasses = {
  small: "text-xs",
  regular: "text-sm",
};

export default function Tag({
  children,
  color = "blue",
  size = "regular",
}: TagProps) {
  return (
    <span
      className={`py-0.5 px-2 rounded-2xl text-sm shadow-sm ${
        categoryColorMap[color as keyof typeof categoryColorMap]
      } ${sizeClasses[size]} `}
    >
      {/* ` */}
      {children}
    </span>
  );
}
