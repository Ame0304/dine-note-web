import { ReactNode, useState } from "react";
import PrivateNavbar from "./PrivateNavbar";
import Sidebar from "./Sidebar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-primary-950">
      <PrivateNavbar onToggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="flex h-full">
        <Sidebar show={showSidebar} />

        <main className="relative flex-1 overflow-y-auto py-8 transition-[padding] duration-200 ease-in-out px-4 lg:px-8">
          {/* Overlay for mobile */}
          {showSidebar && (
            <div
              className="fixed inset-0 z-20 bg-primary-900/50 backdrop-blur-lg backdrop-saturate-150 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}
          {/* Main content */}
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
