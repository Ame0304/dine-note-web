import Image from "next/image";
import Heading from "./Heading";

interface FeatureProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

export default function Feature({
  title,
  description,
  imageUrl,
  reverse = false,
}: FeatureProps) {
  const imageFirst = reverse ? "lg:order-last" : "";
  return (
    <div
      className="grid grid-cols-1 gap-8 lg:gap-24 lg:grid-cols-2
      "
    >
      <div className={`lg:max-w-lg ${imageFirst}`}>
        <p className="text-md font-semibold text-accent-400">
          Cook, Record, Share
        </p>
        <Heading level="h1" className="tracking-tight text-pretty mt-2">
          {title}
        </Heading>
        <p className="mt-6 text-lg/8 text-primary-100">{description}</p>
      </div>
      <Image
        alt={title}
        src={imageUrl}
        width={1280}
        height={853}
        className="w-full h-auto aspect-[3/2] object-cover rounded-xl ring-1 shadow-2xl ring-accent-300"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
