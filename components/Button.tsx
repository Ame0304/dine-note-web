interface ButtonProps {
  children: string;
  size?: "small" | "regular" | "large";
}

export default function Button({ children, size = "regular" }: ButtonProps) {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    regular: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
  };

  return (
    <button
      className={`bg-accent-500 hover:bg-accent-600 rounded-md text-accent-50 ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}
