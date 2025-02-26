import { ReactNode, useState } from "react";

import Sidebar from "./Sidebar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-primary-950">
      <div className="flex h-full">
        <Sidebar
          expanded={showSidebar}
          onToggle={() => setShowSidebar(!showSidebar)}
        />

        <main
          className={`relative flex-1 overflow-y-auto py-8 transition-[padding] duration-300 ease-in-out px-4 lg:px-8 ${
            showSidebar ? "ml-0" : "ml-12 lg:ml-0"
          }`}
        >
          {/* Overlay for mobile */}
          {showSidebar && (
            <div
              className="fixed inset-0 z-20 bg-white/50 backdrop-blur-lg backdrop-saturate-150 lg:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          )}
          {/* Main content */}
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
