import { ReactNode } from "react";
import PrivateNavbar from "./PrivateNavbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className=" antialiased flex flex-col relative">
      <PrivateNavbar />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </div>
      {/* TODO: Footer */}
    </div>
  );
}
