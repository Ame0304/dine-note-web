import Link from "next/link";
import { useRouter } from "next/router";
import { HomeIcon, BookOpenIcon, UserIcon } from "@heroicons/react/24/outline";

import Button from "./Button";
import Logo from "./Logo";
import { createClient } from "@/lib/supabase/component";
import { toast } from "react-hot-toast";
import ToggleSidebarButton from "./ToggleSidebarButton";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Recipes", href: "/recipes", icon: BookOpenIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
];

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

export default function Sidebar({ expanded, onToggle }: SidebarProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message, { id: "logout" });
    } else {
      toast.success("Logged out successfully!", { id: "logout" });
      router.push("/");
    }
  };

  // Full sidebar when expanded
  return (
    <aside
      className={`rounded-xl fixed top-0 bottom-0 left-0 z-30 transform overflow-hidden bg-white/80 transition-all duration-300 ease-in-out lg:static lg:h-screen shadow-xl backdrop-blur-md backdrop-saturate-150 ${
        expanded ? "w-72" : "w-12"
      }`}
    >
      {expanded ? (
        <div className="flex flex-col h-full px-2">
          {/* Header with logo and toggle */}
          <div className="py-6 border-b border-primary-900/50">
            <div className="flex items-center justify-between mb-2">
              <Logo />
              <ToggleSidebarButton onClick={onToggle} isOpen={true} />
            </div>
          </div>
          {/* Navigation links */}
          <nav className="flex-1 py-6 px-2">
            <ul className="space-y-3">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-md font-medium ${
                        isActive
                          ? "bg-accent-500 text-primary-950"
                          : "text-accent-500 hover:bg-accent-500 hover:text-primary-950"
                      }`}
                    >
                      <item.icon
                        className="size-6 stroke-2"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer with logout button */}
          <div className="border-t border-primary-900 py-6">
            <Button size="full" onClick={handleSignout}>
              Log out
            </Button>
          </div>
        </div>
      ) : (
        // Collapsed sidebar content
        <div className="flex flex-col items-center pt-6">
          <ToggleSidebarButton onClick={onToggle} isOpen={false} />
        </div>
      )}
    </aside>
  );
}
