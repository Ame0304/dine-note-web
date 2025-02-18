import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center z-10">
      <Image
        src={logo}
        height="60"
        quality={100}
        width="60"
        alt="DineNote logo"
      />
      <span className="text-4xl font-semibold text-accent-500 hidden md:block">
        DineNote
      </span>
    </Link>
  );
}
