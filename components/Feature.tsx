import Image from "next/image";

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
      className="grid grid-cols-1 gap-8 lg:gap-24 lg:grid-cols-2 lg:items-center
      "
    >
      <div className={`lg:max-w-lg ${imageFirst}`}>
        <h2 className="text-md font-semibold text-primary-500">
          Cook, Record, Share
        </h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary-100 sm:text-5xl">
          {title}
        </p>
        <p className="mt-6 text-lg/8 text-primary-100">{description}</p>
      </div>
      <div className="relative">
        <Image
          alt={title}
          src={imageUrl}
          width={1280}
          height={853}
          className="w-full h-auto aspect-[3/2] object-cover rounded-xl ring-1 shadow-2xl ring-accent-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
