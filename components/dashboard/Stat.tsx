interface StatProps {
  title: string;
  value: string;
  color?: string;
  children: React.ReactNode;
  size?: "small" | "large";
}

export default function Stat({
  title,
  children,
  value,
  color = "sky",
  size = "large",
}: StatProps) {
  const sizeClass = {
    small: "text-xs",
    large: "text-3xl",
  };
  return (
    <div className="grid grid-cols-3 gap-4 items-center h-full">
      <div className="col-span-1 flex items-center justify-center">
        <div className={`bg-${color}-100 p-2 rounded-full`}>{children}</div>
      </div>
      <div className="col-span-2 flex flex-col items-start justify-center">
        <p className="text-sm font-semibold">{title}</p>
        <p className={`font-bold ${sizeClass[size]}`}>{value}</p>
      </div>
    </div>
  );
}
