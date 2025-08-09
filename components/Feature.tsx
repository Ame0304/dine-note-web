import Image from "next/image";
import Heading from "./Heading";

interface FeatureProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
  quote?: string;
}

export default function Feature({
  title,
  description,
  imageUrl,
  reverse = false,
  quote,
}: FeatureProps) {
  // Extract emoji and text from title
  const emojiMatch = title.match(/^(\p{Emoji}+)\s*(.*)$/u);
  const emoji = emojiMatch ? emojiMatch[1] : "";
  const textPart = emojiMatch ? emojiMatch[2] : title;

  return (
    <div className="group hover:-translate-y-1 transition-all duration-300 ease-out">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div
          className={`flex-1 space-y-6 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }  `}
        >
          {/* Heading with emoji and quote */}
          <Heading
            level="h1"
            className="text-2xl lg:text-3xl font-bold leading-tight"
          >
            {emoji && <span className="text-primary-100 mr-2">{emoji}</span>}
            <span className="bg-gradient-to-r from-accent-500 to-primary-900 bg-clip-text text-transparent">
              {textPart}
            </span>
          </Heading>
          <div className="bg-gradient-to-r from-accent-200/20 to-primary-900/50 rounded-xl py-1 px-3 border-l-4 border-accent-200 w-fit">
            <p className="text-accent-200 italic font-semibold text-base lg:text-lg">
              {quote}
            </p>
          </div>
          <p className="text-lg lg:text-xl leading-relaxed font-medium">
            {description}
          </p>
        </div>
        <div
          className={`flex-1 max-w-lg lg:max-w-xl ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="relative overflow-hidden rounded-xl bg-primary-900/20">
            <Image
              alt={title}
              src={imageUrl}
              width={1280}
              height={853}
              className="w-full h-auto aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
