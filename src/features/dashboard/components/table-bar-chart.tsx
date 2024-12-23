"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type dataChartBarProps = {
  month: string;
  totalQuantity: number;
}

const chartConfig = {
  totalQuantity: {
    label: "Produk Terjual",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TableBarChart({
  dataChartBar,
}: {
  dataChartBar: dataChartBarProps[];
}) {
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardTitle>Penjualan Produk</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dataChartBar}
            margin={{
              left: -20,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.toLocaleString("id-ID")}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="totalQuantity"
              fill="var(--color-totalQuantity)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
