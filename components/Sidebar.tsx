import Link from "next/link";
import { useRouter } from "next/router";
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  CalendarDateRangeIcon,
} from "@heroicons/react/24/outline";

import Button from "./Button";
import Logo from "./Logo";
import { createClient } from "@/lib/supabase/component";
import { toast } from "react-hot-toast";
import ToggleSidebarButton from "./ToggleSidebarButton";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Recipes", href: "/recipes", icon: BookOpenIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Meal Plans", href: "/meal-plans", icon: CalendarDateRangeIcon },
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
    <aside className="h-full flex flex-col">
      <div
        className={`overflow-hidden rounded-r-xl fixed z-30 transform bg-white/70 transition-all duration-300 ease-in-out backdrop-blur-md backdrop-saturate-150 flex flex-col px-3 flex-1
          ${
            expanded
              ? "w-72 lg:static h-screen"
              : "w-14 items-center left-6 top-6 p-2 max-h-fit"
          }`}
      >
        {/* Toggle button for collapsed state */}
        {!expanded && <ToggleSidebarButton onClick={onToggle} isOpen={false} />}

        {/* Content only shown when expanded */}
        <div className={`${expanded ? "block w-full" : "hidden"}`}>
          {/* Header with logo and toggle */}
          <div className="pt-6 border-b border-primary-900/50">
            <div className="flex items-center justify-between mb-2">
              <Logo size="small" />
              <ToggleSidebarButton onClick={onToggle} isOpen={true} />
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav
          className={`${
            expanded
              ? "flex-1 py-4 px-2 w-full block"
              : "w-full mt-4 hidden lg:block"
          }`}
        >
          <ul
            className={`${
              expanded ? "space-y-3" : "flex flex-col items-center space-y-5"
            }`}
          >
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl text-md font-medium text-accent-500 
                      ${expanded ? "px-4 py-3" : "justify-center p-2"}
                      ${
                        isActive
                          ? "bg-accent-500 text-primary-950 "
                          : "hover:bg-accent-500 hover:text-primary-950"
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
