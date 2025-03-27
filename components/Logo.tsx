import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

interface LogoProps {
  size?: "small" | "large";
}

export default function Logo({ size = "large" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center z-10">
      <Image
        src={logo}
        height={50}
        quality={100}
        width={50}
        alt="DineNote logo"
      />
      <span
        className={`font-semibold text-primary-900 ${
          size === "small" ? "text-3xl" : "text-4xl"
        }`}
      >
        Dine<span className="text-accent-500">Note</span>
      </span>
    </Link>
  );
}
