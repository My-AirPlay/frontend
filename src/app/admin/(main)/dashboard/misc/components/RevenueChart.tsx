"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "17 Sun", this_week: 186, last_week: 80 },
  { month: "18 Mon", this_week: 305, last_week: 200 },
  { month: "19 Tue", this_week: 237, last_week: 120 },
  { month: "20 Wed", this_week: 73, last_week: 190 },
  { month: "21 Thur", this_week: 209, last_week: 130 },
  { month: "22 Fri", this_week: 214, last_week: 140 },
  { month: "23 Sat", this_week: 237, last_week: 120 },
]

const chartConfig = {
  this_week: {
    label: "This week",
    color: "hsl(var(--primary))",
  },
  last_week: {
    label: "Last week",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
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
            <Bar dataKey="this_week" fill="var(--color-this_week)" radius={4} />
            <Bar dataKey="last_week" fill="var(--color-last_week)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
