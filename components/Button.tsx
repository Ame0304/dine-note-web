interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "xs" | "small" | "regular" | "large" | "full";
  variant?: "primary" | "alert" | "link" | "outline";
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
    xs: "px-1 py-1 text-sm",
    small: "px-2 py-1 text-sm",
    regular: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
    full: "w-full py-1.5",
  };

  const variantClasses = {
    primary:
      "text-accent-500 bg-accent-500 text-primary-950 hover:bg-accent-400",
    alert:
      "border-2 border-accent-400 text-accent-400 hover:bg-accent-400 hover:text-white",
    link: "text-accent-200 transition-colors bg-transparent shadow-none",
    outline:
      "border-2 border-accent-200 text-accent-200 hover:text-accent-500 hover:border-accent-500",
  };

  // Link variant with icon has different styling
  if (variant === "link" && icon) {
    return (
      <button
        {...props}
        className={`flex items-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed ${
          variantClasses[variant]
        } ${props.className || ""}  `}
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
      className={`rounded-xl shadow-lg ${sizeClasses[size]} ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
    >
      {isLoading ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-accent-500 border-r-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
