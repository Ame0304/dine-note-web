import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import Button from "./Button";
import Logo from "./Logo";

import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary-700/50 bg-primary-950/70 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-primary-950/60">
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
              className="origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 rounded-xl border border-primary-500 bg-accent-500 p-1.5 flex flex-col gap-1 text-center"
            >
              <MenuItem>
                <div className="text-lg text-primary-950 hover:bg-accent-400 py-1 px-3 rounded-lg w-full">
                  {user ? (
                    <Link href="dashboard">Dashboard</Link>
                  ) : (
                    <Link href="/auth/login">Log in</Link>
                  )}
                </div>
              </MenuItem>
              <div className="text-lg text-primary-950 hover:bg-accent-400 py-1 px-3 rounded-lg w-full">
                <Link href="#">Sign up</Link>
              </div>
            </MenuItems>
          </Menu>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-5 items-center">
          {user ? (
            <Link
              href="dashboard"
              className="text-lg font-regular text-accent-500 hover:text-accent-400"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="text-lg font-regular text-accent-500 hover:text-accent-400"
            >
              Log in
            </Link>
          )}

          <Link href="/auth/signup">
            <Button size="regular">Get started</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
