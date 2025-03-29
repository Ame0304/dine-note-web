interface StatProps {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  color?: string;
}

export default function Stat({ title, Icon, value, color = "sky" }: StatProps) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center h-full">
      <div className="col-span-1 flex items-center justify-center">
        <div className={`bg-${color}-100 p-2 rounded-full`}>
          <Icon
            className={`w-8 h-8 p-0.5 text-${color}-600 stroke-${color}-600`}
          />
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-start justify-center">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}
