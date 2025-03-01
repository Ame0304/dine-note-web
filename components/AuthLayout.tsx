import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import Heading from "./Heading";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export default function AuthLayout({
  children,
  title,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-3 lg:px-8 bg-primary-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center -mt-12">
        <Link href="/">
          <Image
            src={logo}
            height="60"
            quality={100}
            width="60"
            alt="DineNote logo"
            className="drop-shadow-glow"
          />
        </Link>

        <Heading level="h2" className="mt-3 tracking-tight text-pretty">
          {title}
        </Heading>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white/40 backdrop-blur-md backdrop-saturate-150 p-6 rounded-xl border border-accent-500/30 shadow-xl">
          {children}
        </div>

        <p className="mt-10 text-center text-sm/6 text-primary-100 hover:underline">
          {footerText}{" "}
          <Link
            href={footerLinkHref}
            className="font-semibold text-accent-500 hover:text-accent-400 transition-colors"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
