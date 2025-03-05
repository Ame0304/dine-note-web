import React from "react";
import Heading from "@/components/Heading";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Tag from "./Tag";

interface RecipeCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  tried: boolean;
}

export default function RecipeCard({
  title,
  description,
  tags,
  imageUrl,
  tried,
}: RecipeCardProps) {
  return (
    <div className="bg-white/80 rounded-xl shadow-xl flex flex-col items-center overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
      <div className="relative w-full pb-[75%]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover absolute top-0 left-0"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
        {/* "Tried" indicator badge */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-0.5 shadow-md">
          {tried && <CheckBadgeIcon className="fill-green-300 size-6" />}
        </div>
      </div>

      {/* divider */}
      <div className="w-1/2 mt-5 h-1 bg-accent-500"></div>
      {/* Recipe Info */}

      <div className="w-full flex flex-col p-4">
        <Heading level="h4">{title}</Heading>
        <p className="text-primary-50">{description}</p>
        {/* Tags */}
        <div className="w-full flex flex-wrap mt-2 justify-start gap-2">
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
