import { Lexend } from "next/font/google";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={` ${lexend.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
    >
      <Navbar />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </div>
      {/* TODO: Footer */}
    </div>
  );
}
