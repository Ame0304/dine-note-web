interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "regular" | "large" | "full";
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export default function Button({
  children,
  size = "regular",
  variant = "primary",
  isLoading,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    regular: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
    full: "w-full py-1.5",
  };

  const variantClasses = {
    primary: "bg-accent-500 hover:bg-accent-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
  };

  return (
    <button
      {...props}
      className={`rounded-md ${sizeClasses[size]} ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
