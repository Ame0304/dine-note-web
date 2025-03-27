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

  return (
    <aside className="h-full lg:h-auto lg:flex lg:flex-col">
      <div
        className={`overflow-hidden rounded-xl fixed z-30 transform bg-white/80 transition-all duration-300 ease-in-out shadow-xl backdrop-blur-md backdrop-saturate-150 flex flex-col top-6 bottom-6 left-4 px-2 lg:min-h-0 lg:max-h-[calc(100vh-3rem)] lg:flex-1
          ${
            expanded
              ? "w-64 lg:static lg:my-6 lg:ml-4 "
              : "w-14 items-center pt-14"
          }`}
      >
        {/* Toggle button for collapsed state */}
        {!expanded && <ToggleSidebarButton onClick={onToggle} isOpen={false} />}

        {/* Content only shown when expanded */}
        <div className={`${expanded ? "block w-full" : "hidden"}`}>
          {/* Header with logo and toggle */}
          <div className="py-6 border-b border-primary-900/50">
            <div className="flex items-center justify-between mb-2">
              <Logo size="small" />
              <ToggleSidebarButton onClick={onToggle} isOpen={true} />
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav
          className={`${expanded ? "flex-1 py-4 px-2 w-full" : "w-full mt-4"}`}
        >
          <ul
            className={`${
              expanded ? "space-y-3" : "flex flex-col items-center space-y-6"
            }`}
          >
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl text-md font-medium 
                      ${expanded ? "px-3 py-2" : "justify-center p-2"}
                      ${
                        isActive
                          ? "bg-accent-500 text-primary-950"
                          : "text-accent-500 hover:bg-accent-500 hover:text-primary-950"
                      }`}
                  >
                    <item.icon className="size-6 stroke-2" aria-hidden="true" />
                    {expanded && item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer with logout button - only shown when expanded */}
        {expanded && (
          <div className="border-t border-primary-900 py-6">
            <Button size="full" onClick={handleSignout}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
