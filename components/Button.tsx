interface ButtonProps {
  children: string;
  size?: "small" | "regular" | "large" | "full";
  onClick?: () => void;
}

export default function Button({
  children,
  size = "regular",
  onClick,
}: ButtonProps) {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    regular: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
    full: "w-full py-1.5",
  };

  return (
    <button
      className={`bg-accent-500 hover:bg-accent-600 rounded-md text-accent-50 ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
