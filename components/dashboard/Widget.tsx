export default function Widget({
  size = "medium",
  children,
}: {
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}) {
  const sizeClasses = {
    small: "col-span-1 sm:col-span-2 lg:col-span-2",
    medium: "col-span-1 sm:col-span-3 lg:col-span-3",
    large: "col-span-1 sm:col-span-6 lg:col-span-6",
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-white/50 border-4 border-accent-200/50 rounded-xl py-2 px-4 flex flex-col`}
    >
      {children}
    </div>
  );
}
