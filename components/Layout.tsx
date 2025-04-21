import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Logo from "./Logo";

export default function Layout({
  children,
  isSharePage = false,
}: {
  children: ReactNode;
  isSharePage?: boolean;
}) {
  return (
    <div className=" antialiased flex flex-col relative min-h-screen">
      {isSharePage ? (
        <header className="fixed top-0 left-0 right-0 border-b border-primary-900/50 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-primary-950">
          <nav
            aria-label="Global"
            className="flex justify-between items-center max-w-7xl mx-auto p-3 h-16"
          >
            <div className="xl:-ml-5">
              <Logo />
            </div>
          </nav>
        </header>
      ) : (
        <Navbar />
      )}
      <div className="flex-1 px-8 py-12 grid mt-16">
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </div>
      {/* TODO: Footer */}
    </div>
  );
}
