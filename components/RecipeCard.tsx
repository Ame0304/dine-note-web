import React from "react";
import Heading from "@/components/Heading";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Tag from "./Tag";

interface RecipeCardProps {
  title: string;
  description: string;
  categories: string[];
  imageUrl: string;
  tried: boolean;
}

export default function RecipeCard({
  title,
  description,
  categories,
  imageUrl,
  tried,
}: RecipeCardProps) {
  return (
    <div className="bg-primary-950/80 rounded-xl shadow-xl flex flex-col items-center overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
      <div className="relative w-full pb-[75%]">
        <Image
          src={imageUrl || "/default-recipe.png"}
          alt={title}
          fill
          className="object-cover absolute top-0 left-0"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
        {/* "Tried" indicator badge */}
        <div className="absolute top-3 right-3 bg-white/60 rounded-full p-0.5 shadow-md">
          <CheckCircleIcon
            className={
              tried
                ? "size-6 stroke-primary-950 fill-accent-500"
                : "size-6 stroke-accent-500 fill-white"
            }
          />
        </div>
      </div>

      {/* divider */}
      <div className="w-1/2 mt-5 h-1 bg-accent-500"></div>

      {/* Recipe Info */}
      <div className="w-full flex flex-col p-4 h-full justify-between">
        <Heading level="h4">{title}</Heading>
        <p className="text-primary-50 text-md">{description}</p>
        {/* Tags */}
        <div className="mt-4 w-full flex flex-wrap justify-start gap-2">
          {categories.map((category, i) => (
            <Tag key={i}>{category}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
