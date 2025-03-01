"use client";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
const chartData = [
  { month: "January", spent: 186, received: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Spent",
    color: "#2563eb",
  },
  mobile: {
    label: "Received",
    color: "#60a5fa",
  },
} satisfies ChartConfig;
export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-96">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="spent" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="received" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
