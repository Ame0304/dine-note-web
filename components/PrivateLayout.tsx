import { ReactNode, useState } from "react";

import Sidebar from "./Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000, // 1 min
            refetchOnWindowFocus: true,
            retry: 1,
          },
        },
      })
  );
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-primary-950">
        <div className="flex h-screen overflow-hidden flex-1">
          <Sidebar
            expanded={showSidebar}
            onToggle={() => setShowSidebar(!showSidebar)}
          />

          <main
            className={`relative flex-1 overflow-y-auto py-8 px-4 lg:px-8 transition-transform duration-300 ease-in-out ${
              showSidebar ? "lg:translate-x-0" : "lg:translate-x-10"
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
    </QueryClientProvider>
  );
}
