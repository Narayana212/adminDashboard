"use client";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";



const data= [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
]

export function DashBoardLineChart() {
  return (
    <ResponsiveContainer width="100%" height={350} className={"pt-16"}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="revenue"
          activeDot={{
            r: 6,
            fill: "#22C55E",
          }}
          stroke="#22C55E"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
