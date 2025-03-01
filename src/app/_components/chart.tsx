"use client";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
interface ChartData {
  month: string;
  spent: number;
  received: number;
}
export function SelectMenu() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
export function Chart(props: {
  chartConfig: ChartConfig;
  chartData: ChartData[];
}) {
  return (
    <ChartContainer config={props.chartConfig} className="h-64 w-96">
      <BarChart accessibilityLayer data={props.chartData}>
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
export function ChartWithSelectMenu(props: { id: string }) {
  return (
    <div>
      <Chart chartConfig={} chartData={} />
    </div>
  );
}
