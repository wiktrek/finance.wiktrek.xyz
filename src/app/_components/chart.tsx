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
import { api } from "~/trpc/react";
interface ChartData {
  month: string;
  spent: number;
  received: number;
}
export function SelectMenu(props: { months: string[] }) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        {props.months.map((month) => (
          <SelectItem key={month} value={month}>
            {month}
          </SelectItem>
        ))}
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
  const chartConfig = {
    spent: {
      label: "Spent",
      color: "#2563eb",
    },
    received: {
      label: "Received",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  // const { data, isLoading } = api.finance.getByDate.useQuery({
  //   id: props.id,
  //   since: new Date("2025-03-01"),
  //   until: new Date("2025-03-31"),
  // });
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <SelectMenu months={["03.2025"]} />
      <Chart
        chartConfig={chartConfig}
        chartData={[
          {
            month: "December",
            spent: 100,
            received: 200,
          },
          {
            month: "January",
            spent: 100,
            received: 200,
          },
        ]}
      />
    </>
  );
}
