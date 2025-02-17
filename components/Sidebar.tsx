import Link from "next/link";
import { useRouter } from "next/router";
import { HomeIcon, BookOpenIcon, UserIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Recipes", href: "/recipes", icon: BookOpenIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
];

interface SidebarProps {
  show: boolean;
}

export default function Sidebar({ show }: SidebarProps) {
  const router = useRouter();

  return (
    <div
      className={`${
        show
          ? "w-72 translate-x-0"
          : "w-0 -translate-x-full lg:w-0 lg:translate-x-0"
      } fixed top-16 bottom-0 left-0 z-30 transform overflow-hidden bg-primary-950 transition-all duration-200 ease-in-out lg:static lg:h-[calc(100vh-4rem)] shadow-xl`}
    >
      <div className="w-72">
        <nav className="space-y-3 mt-6 mx-5">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-md font-medium ${
                  isActive
                    ? "bg-accent-400 text-primary-950"
                    : "text-accent-500 hover:bg-accent-300 hover:text-primary-950"
                }`}
              >
                <item.icon className="size-5" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
