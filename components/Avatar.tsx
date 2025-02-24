import Image from "next/image";

export default function Avatar({ src }: { src: string }) {
  return (
    <Image
      className="rounded-full"
      src={src}
      width={40}
      height={40}
      alt="User Avatar"
    />
  );
}
