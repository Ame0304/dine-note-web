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
  const imageFirst = reverse ? "lg:order-last" : "";
  return (
    <div
      className="grid grid-cols-1 gap-8 lg:gap-24 lg:grid-cols-2
      "
    >
      <div className={`lg:max-w-lg ${imageFirst}`}>
        <Heading level="h1" className="mt-2">
          {title}
        </Heading>
        <blockquote className="mt-4 relative border-s-8 rounded-sm border-accent-200 ">
          <p className="bg-white/70 w-fit rounded-md py-0.5 px-3 text-accent-400 italic text-md font-medium">
            {quote}
          </p>
        </blockquote>
        <p className="mt-6 text-lg">{description}</p>
      </div>
      <Image
        alt={title}
        src={imageUrl}
        width={1280}
        height={853}
        className="w-full h-auto aspect-[3/2] object-cover rounded-xl"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
