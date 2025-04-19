interface StatProps {
  title: string;
  value: string;
  color?: string;
  children: React.ReactNode;
}

export default function Stat({
  title,
  children,
  value,
  color = "sky",
}: StatProps) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center h-12">
      <div className="col-span-1 flex items-center justify-center">
        <div className={`bg-${color}-100 p-2 rounded-full`}>{children}</div>
      </div>
      <div className="col-span-2 flex flex-col items-start justify-center">
        <p className="text-sm font-semibold">{title}</p>
        <p className="font-bold text-3xl">{value}</p>
      </div>
    </div>
  );
}
