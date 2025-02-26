import { ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className=" antialiased flex flex-col relative min-h-screen">
      <Navbar />
      <div className="flex-1 px-8 py-12 grid mt-16">
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </div>
      {/* TODO: Footer */}
    </div>
  );
}
