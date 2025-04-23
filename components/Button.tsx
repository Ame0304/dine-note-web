interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "xs" | "small" | "regular" | "large" | "full";
  variant?: "primary" | "alert" | "link" | "outline" | "mealPlan";
  isLoading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  size = "regular",
  variant = "primary",
  isLoading,
  icon,
  className,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    xs: "px-0.5 py-0.5 text-sm",
    small: "px-2 py-1 text-sm",
    regular: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
    full: "w-full py-1.5",
  };

  const variantClasses = {
    primary:
      "text-primary-950 bg-gradient-to-r from-accent-200 to-primary-900 hover:bg-gradient-to-l",
    alert: "bg-accent-400 text-primary-950 hover:bg-accent-400/80 ",
    link: "text-accent-200 transition-colors bg-transparent shadow-none",
    outline:
      "border-2 border-accent-200/50 text-accent-200/50 hover:text-accent-200 hover:border-accent-200",
    mealPlan:
      "border-accent-200 border-2 hover:bg-accent-200 hover:text-accent-500",
  };

  // Link variant with icon has different styling
  if (variant === "link" && icon) {
    return (
      <button
        {...props}
        className={`flex items-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed ${
          variantClasses[variant]
        } ${className || ""}  `}
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
      className={`rounded-xl shadow-lg ${sizeClasses[size]} ${
        variantClasses[variant]
      } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium ${
        className || ""
      }`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-accent-500 border-r-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
