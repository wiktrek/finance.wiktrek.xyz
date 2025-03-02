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
export function SelectMonth(props: { months: string[] }) {
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
export function SelectYear(props: { years: string[] }) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {props.years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
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
        <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
        <Bar dataKey="received" fill="var(--color-received)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export function ChartWithSelectMenu(props: { id: string }) {
  const chartConfig = {
    spent: {
      label: "Spent",
      color: "hsl(var(--chart-1))",
    },
    received: {
      label: "Received",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  const { data, isLoading } = api.finance.getByDate.useQuery({
    id: props.id,
    since: new Date("2025-03-01"),
    until: new Date("2025-04-01"),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  let chartData: ChartData[] = [];
  if (data) {
    data.map((item) => {
      if (item.amount > 0) {
        chartData.push({
          month: new Date(item.date).toLocaleString("en", {
            month: "long",
          }),
          received: item.amount,
          spent: 0,
        });
      } else {
        chartData.push({
          month: new Date(item.date).toLocaleString("en", {
            month: "long",
          }),
          spent: item.amount * -1,
          received: 0,
        });
      }
    });
    chartData = chartData.reduce((acc, current) => {
      const existing = acc.find((item) => item.month === current.month);
      if (existing) {
        existing.spent += current.spent / 100;
        existing.received += current.received / 100;
      } else {
        acc.push({
          month: current.month,
          spent: current.spent / 100,
          received: current.received / 100,
        });
      }
      return acc;
    }, [] as ChartData[]);
  }
  return (
    <>
      <SelectYear years={["2025"]} />
      <SelectMonth months={["03.2025"]} />
      <Chart chartConfig={chartConfig} chartData={chartData} />
    </>
  );
}
