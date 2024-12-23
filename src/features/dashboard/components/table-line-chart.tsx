"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type dataChartLineProps = {
  month: string;
  totalAmount: number;
};

const chartConfig = {
  totalAmount: {
    label: "Jumlah Pendapatan",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TableLineChart({ dataChartLine }: { dataChartLine: dataChartLineProps[] }) {
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardTitle>Pendapatan Penjualan</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={dataChartLine}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.toLocaleString("id-ID")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="totalAmount"
              type="monotone"
              stroke="var(--color-totalAmount"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
