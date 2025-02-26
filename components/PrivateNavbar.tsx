import { Bars3Icon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

interface PrivateNavbarProps {
  onToggleSidebar: () => void;
}

export default function PrivateNavbar({ onToggleSidebar }: PrivateNavbarProps) {
  return (
    <header className="sticky top-0 z-40 shadow-sm bg-primary-950">
      <nav className="flex h-16 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-4">
          <Logo />
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center rounded-md p-2 text-accent-500 hover:bg-accent-300 hover:text-primary-950"
          >
            <span className="sr-only">Toggle sidebar</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        </div>

        <UserMenu />
      </nav>
    </header>
  );
}
