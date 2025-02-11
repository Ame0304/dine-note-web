import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import { Kablammo } from "next/font/google";

const kablammo = Kablammo({
  subsets: ["latin"],
  display: "swap",
});
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        height="60"
        quality={100}
        width="60"
        alt="DineNote logo"
      />
      <span className={`${kablammo.className} text-4xl text-accent-500`}>
        DineNote
      </span>
    </Link>
  );
}
