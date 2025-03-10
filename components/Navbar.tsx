import Link from "next/link";
import {
  Bars3Icon,
  UserIcon,
  UserPlusIcon,
  HomeIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import Logo from "./Logo";

import { useUser } from "@/context/UserContext";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, requiresAuth: true },
  { name: "Recipes", href: "/recipes", icon: BookOpenIcon, requiresAuth: true },
  { name: "Profile", href: "/profile", icon: UserIcon, requiresAuth: true },
  { name: "Log in", href: "/auth/login", icon: UserIcon, requiresAuth: false },
  {
    name: "Sign up",
    href: "/auth/signup",
    icon: UserPlusIcon,
    requiresAuth: false,
  },
];

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-primary-900/50 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-white/80">
      <nav
        aria-label="Global"
        className="flex justify-between items-center max-w-7xl mx-auto p-3 h-16"
      >
        <div className="xl:-ml-5">
          <Logo />
        </div>

        {/* Mobile Menu */}

        <div className="flex lg:hidden">
          <Menu>
            <MenuButton className="m-2.5 inline-flex items-center justify-center p-2 text-accent-500">
              <Bars3Icon aria-hidden="true" className="size-6" />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              transition
              className="origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 rounded-xl bg-white/90 text-accent-500 p-1.5 flex flex-col shadow-lg shadow-primary-900"
            >
              {/* Navigation items */}
              {user &&
                navigationItems.map(
                  (item) =>
                    item.requiresAuth && (
                      <MenuItem key={item.name}>
                        <div className="text-lg hover:text-accent-400 py-1 px-3 w-full">
                          <Link
                            href={item.href}
                            className="flex items-center font-medium"
                          >
                            <item.icon className="size-6 inline-block mr-2 stroke-2" />
                            {item.name}
                          </Link>
                        </div>
                      </MenuItem>
                    )
                )}

              {/* Authentication Items */}

              {!user &&
                navigationItems.map(
                  (item) =>
                    !item.requiresAuth && (
                      <MenuItem key={item.name}>
                        <div className="text-lg hover:text-accent-400 py-1 px-3 rounded-lg w-full">
                          <Link
                            href={item.href}
                            className="flex items-center font-medium"
                          >
                            <item.icon className="size-6 inline-block mr-2 stroke-2" />
                            {item.name}
                          </Link>
                        </div>
                      </MenuItem>
                    )
                )}
            </MenuItems>
          </Menu>
        </div>

        {/* Desktop Menu */}

        <div className="hidden lg:flex lg:gap-8 items-center">
          {navigationItems.map((item) =>
            item.requiresAuth && user ? (
              <Link
                key={item.name}
                href={item.href}
                className="text-accent-500 hover:text-accent-400 flex items-center gap-1.5"
              >
                <item.icon className="size-6 stroke-2" aria-hidden="true" />
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            ) : null
          )}
        </div>
      </nav>
    </header>
  );
}
