import { Bars3Icon } from "@heroicons/react/20/solid";

interface ToggleSidebarButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export default function ToggleSidebarButton({
  isOpen,
  onClick,
  className = "",
}: ToggleSidebarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md p-2 text-accent-500 hover:bg-accent-500 hover:text-primary-950 hover:text-primary-950"
      aria-label="Open sidebar ${className}`}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      <Bars3Icon className="size-6" aria-hidden="true" />
    </button>
  );
}
