import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

interface TriedChartProps {
  data: Array<{ name: string; value: number }>;
}

export default function TriedChart({ data }: TriedChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? "#71d7ff" : "#91f8b1"}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} recipes`, `${name}`]}
          contentStyle={{
            backgroundColor: "#fff4e5",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 6px #fcdab8",
            padding: "6px 12px",
            color: "#98D8EF",
            fontSize: "14px",
            fontWeight: 500,
          }}
        />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
}
