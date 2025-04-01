import {
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CategoryChartProps {
  data: Array<{ name: string; count: number; color: string }>;
}

const tailwindColorMap = {
  red: "rgb(246, 160, 160)",
  blue: "rgb(140, 189, 248)",
  green: "rgb(74, 222, 128)",
  yellow: "rgb(239, 217, 119)",
  purple: "rgb(216, 183, 250)",
  pink: "rgb(244, 176, 211)",
  indigo: "rgb(129, 140, 248)",
  orange: "rgb(248, 174, 113)",
  teal: "rgb(144, 245, 232)",
  gray: "rgb(156, 163, 175)",
};

export default function CategoryChart({ data }: CategoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{
          top: 25,
          right: 30,
          left: 10,
          bottom: 0,
        }}
        barCategoryGap={10}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          textAnchor="middle"
          height={50} // Increase height for the axis
          tick={{ fontSize: 14 }}
          tickFormatter={(value) => {
            return value.length > 12 ? `${value.substring(0, 10)}...` : value;
          }}
          interval={0}
        />
        <YAxis />
        <Tooltip
          formatter={(value) => [`${value} recipes`, ""]}
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

        <Bar
          dataKey="count"
          name="Recipes"
          label={{ fill: "white", fontSize: 14 }}
          radius={[10, 10, 0, 0]}
        >
          {data.map((entry, index) => {
            const fillColor =
              tailwindColorMap[entry.color as keyof typeof tailwindColorMap] ||
              entry.color;
            return <Cell key={`cell-${index}`} fill={fillColor} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
