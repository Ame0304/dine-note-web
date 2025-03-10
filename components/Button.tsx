interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "regular" | "large" | "full";
  variant?: "primary" | "secondary" | "link";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  size = "regular",
  variant = "primary",
  isLoading,
  icon,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    regular: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
    full: "w-full py-1.5",
  };

  const variantClasses = {
    primary: "bg-accent-500 text-white hover:bg-accent-400",
    secondary: "bg-white text-accent-500 hover:text-accent-400",
    link: "text-accent-500 hover:text-accent-400 transition-colors bg-transparent shadow-none",
  };

  // Link variant with icon has different styling
  if (variant === "link" && icon) {
    return (
      <button
        {...props}
        className={`flex items-center gap-2 text-sm text-accent-500 hover:text-accent-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
          props.className || ""
        }`}
      >
        <>
          <span>{children}</span>
          {icon}
        </>
      </button>
    );
  }

  return (
    <button
      {...props}
      className={`rounded-md shadow-lg ${sizeClasses[size]} ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-accent-500 border-r-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
