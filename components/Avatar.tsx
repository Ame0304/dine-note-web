import Image from "next/image";

interface AvatarProps {
  src: string;
  size?: "regular" | "large";
}

export default function Avatar({ src, size = "regular" }: AvatarProps) {
  const sizeNumber = size === "regular" ? 40 : 70;
  return (
    <Image
      className="rounded-full"
      src={src}
      width={sizeNumber}
      height={sizeNumber}
      alt="User Avatar"
    />
  );
}
